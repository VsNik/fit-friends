import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAlertEntity1698495681199 implements MigrationInterface {
    name = 'AddAlertEntity1698495681199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alerts" ("id" uuid NOT NULL, "fromUserId" uuid NOT NULL, "userId" uuid NOT NULL, "text" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "alerts"`);
    }

}
