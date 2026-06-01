import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNameToFullNameInTestProducts1780311491800 implements MigrationInterface {
    name = 'RenameNameToFullNameInTestProducts1780311491800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "fullName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "fullName" TO "name"`);
    }

}
