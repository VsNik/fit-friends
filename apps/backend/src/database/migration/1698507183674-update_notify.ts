import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotify1698507183674 implements MigrationInterface {
    name = 'UpdateNotify1698507183674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_d94a8f83d06c221fbaaad742937"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "trainingId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "coachName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "trainingTitle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "trainingImage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "trainingImage"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "trainingTitle"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "coachName"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "trainingId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_d94a8f83d06c221fbaaad742937" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
