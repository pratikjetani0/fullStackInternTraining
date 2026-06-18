import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { UpdateUserDto } from '../src/user/dto/update-user.dto.js';

describe('E2E TESTING', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let bookmarkId: number;

  const dto = {
    email: 'test@test.com',
    password: '123456',
  };

  const bookmarkDto = {
    title: 'NestJS Docs',
    description: 'Official NestJS documentation',
    link: 'https://nestjs.com',
  };

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    prisma = app.get(PrismaService);

    // Clean test database
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  describe('AUTH', () => {
    describe('Signup', () => {
      it('should signup', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(dto)
          .expect(201);
      });

      it('should fail if email already exists', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(dto)
          .expect(409);
      });
    });

    describe('Signin', () => {
      it('should signin', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/signin')
          .send(dto)
          .expect(200);

        expect(res.body.access_token).toBeDefined();

        accessToken = res.body.access_token;
      });

      it('should fail with wrong password', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: dto.email,
            password: 'wrong-password',
          })
          .expect(401);
      });
    });
  });

  describe('USER', () => {
    describe('Current Users', () => {
      it('should get current user', () => {
        return request(app.getHttpServer())
          .get('/users/me')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });

    describe('Update Users', () => {
      it('should update user', () => {
        const dto: UpdateUserDto = {
          email: 'oorat@gmail.com',
        };

        return request(app.getHttpServer())
          .patch('/users')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(dto)
          .expect(200);
      });
    });
  });

  describe('BOOKMARKS', () => {
    describe('Create Bookmark', () => {
      it('should create bookmark', async () => {
        const res = await request(app.getHttpServer())
          .post('/bookmarks')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(bookmarkDto)
          .expect(201);

        expect(res.body.id).toBeDefined();

        bookmarkId = res.body.id;
      });
    });

    describe('Get Bookmarks', () => {
      it('should get all bookmarks', () => {
        return request(app.getHttpServer())
          .get('/bookmarks')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });

    describe('Get Bookmark By Id', () => {
      it('should get bookmark by id', () => {
        return request(app.getHttpServer())
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });

    describe('Edit Bookmark', () => {
      it('should edit bookmark', () => {
        return request(app.getHttpServer())
          .patch(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
            title: 'Updated NestJS Docs',
          })
          .expect(200);
      });
    });

    describe('Delete Bookmark', () => {
      it('should delete bookmark', () => {
        return request(app.getHttpServer())
          .delete(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });
  });
});
