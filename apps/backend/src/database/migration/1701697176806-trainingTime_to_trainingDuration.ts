import { MigrationInterface, QueryRunner } from "typeorm";

export class TrainingTimeToTrainingDuration1701697176806 implements MigrationInterface {
    name = 'TrainingTimeToTrainingDuration1701697176806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "trainingTime" TO "trainingDuration"`);
        await queryRunner.query(`ALTER TYPE "public"."users_trainingtime_enum" RENAME TO "users_trainingduration_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_trainingduration_enum" RENAME TO "users_trainingtime_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "trainingDuration" TO "trainingTime"`);
    }

}
