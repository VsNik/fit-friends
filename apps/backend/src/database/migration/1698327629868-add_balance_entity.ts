import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBalanceEntity1698327629868 implements MigrationInterface {
    name = 'AddBalanceEntity1698327629868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balans" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "count" integer NOT NULL DEFAULT '0', "createdAt" character varying NOT NULL, CONSTRAINT "PK_72d2149c8cc9614e74f022a8f6f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "balans"`);
    }

}
