import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToTestProducts1780311313608 implements MigrationInterface {
    name = 'AddDescriptionToTestProducts1780311313608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_products" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_products" DROP COLUMN "description"`);
    }

}
