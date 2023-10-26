import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1698337385114 implements MigrationInterface {
    name = 'Fix1698337385114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "UQ_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "UQ_2d06b1cd5c6b5546d70aea4d194" UNIQUE ("trainingId")`);
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "balans" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
