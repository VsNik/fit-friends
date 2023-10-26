import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBalanceEntity1698327743164 implements MigrationInterface {
    name = 'FixBalanceEntity1698327743164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" ADD "trainingId" uuid`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "UQ_2d06b1cd5c6b5546d70aea4d194" UNIQUE ("trainingId")`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "UQ_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "trainingId"`);
    }

}
