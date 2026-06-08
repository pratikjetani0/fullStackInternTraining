import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1780895791027 implements MigrationInterface {
    name = 'CreateProductsTable1780895791027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "imageUrl" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
