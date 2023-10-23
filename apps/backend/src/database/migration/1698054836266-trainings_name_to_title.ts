import { MigrationInterface, QueryRunner } from "typeorm";

export class TrainingsNameToTitle1698054836266 implements MigrationInterface {
    name = 'TrainingsNameToTitle1698054836266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" RENAME COLUMN "title" TO "name"`);
    }

}
