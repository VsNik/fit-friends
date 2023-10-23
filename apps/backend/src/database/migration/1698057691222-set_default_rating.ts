import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultRating1698057691222 implements MigrationInterface {
    name = 'SetDefaultRating1698057691222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "rating" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "rating" DROP DEFAULT`);
    }

}
