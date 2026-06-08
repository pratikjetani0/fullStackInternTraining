import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartItemsTable1780904870476 implements MigrationInterface {
    name = 'CreateCartItemsTable1780904870476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "UQ_f5c53f7e745f8fa6e473875aaa2" UNIQUE ("userId", "productId"), CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_84e765378a5f03ad9900df3a9ba" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_84e765378a5f03ad9900df3a9ba"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
    }

}
