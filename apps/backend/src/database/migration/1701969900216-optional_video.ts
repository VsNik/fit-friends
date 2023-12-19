import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalVideo1701969900216 implements MigrationInterface {
    name = 'OptionalVideo1701969900216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" DROP NOT NULL`);
    }

}
