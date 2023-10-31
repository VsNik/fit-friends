import { MigrationInterface, QueryRunner } from "typeorm";

export class SetReviewRatingDefault1698755788672 implements MigrationInterface {
    name = 'SetReviewRatingDefault1698755788672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" DROP DEFAULT`);
    }

}
