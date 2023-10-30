import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvitations1698662419262 implements MigrationInterface {
    name = 'AddInvitations1698662419262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invitations_status_enum" AS ENUM('waiting', 'rejected', 'accepted')`);
        await queryRunner.query(`CREATE TABLE "invitations" ("id" uuid NOT NULL, "initiatorId" uuid NOT NULL, "toUserId" uuid NOT NULL, "status" "public"."invitations_status_enum" NOT NULL DEFAULT 'waiting', "createdAt" character varying NOT NULL, "changedAt" character varying NOT NULL, CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invitations"`);
        await queryRunner.query(`DROP TYPE "public"."invitations_status_enum"`);
    }

}
