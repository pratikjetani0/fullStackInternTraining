import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewCloumnPhoneInUser1780311798143 implements MigrationInterface {
    name = 'AddNewCloumnPhoneInUser1780311798143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(100) NOT NULL DEFAULT '0000000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
