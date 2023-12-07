import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalVideo1701969567710 implements MigrationInterface {
    name = 'OptionalVideo1701969567710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "video" SET NOT NULL`);
    }

}
