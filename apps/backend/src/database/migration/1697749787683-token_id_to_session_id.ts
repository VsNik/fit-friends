import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenIdToSessionId1697749787683 implements MigrationInterface {
    name = 'TokenIdToSessionId1697749787683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" RENAME COLUMN "tokenId" TO "sessionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" RENAME COLUMN "sessionId" TO "tokenId"`);
    }

}
