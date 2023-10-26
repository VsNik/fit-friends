import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1698337086538 implements MigrationInterface {
    name = 'Fix1698337086538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD "userId" uuid NOT NULL`);
    }

}
