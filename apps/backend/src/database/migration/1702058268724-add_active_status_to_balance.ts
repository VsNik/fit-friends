import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveStatusToBalance1702058268724 implements MigrationInterface {
    name = 'AddActiveStatusToBalance1702058268724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" ADD "isActive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balans" DROP COLUMN "isActive"`);
    }

}
