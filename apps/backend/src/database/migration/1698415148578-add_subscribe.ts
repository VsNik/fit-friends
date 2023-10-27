import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscribe1698415148578 implements MigrationInterface {
    name = 'AddSubscribe1698415148578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_subscribing_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_9f0113e52ef767128bf062a4ec7" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d8bc6e77e5c1f211a484a8a88" ON "users_subscribing_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_41d2bfdf074ec9a1993dbfb5c8" ON "users_subscribing_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" ADD CONSTRAINT "FK_2d8bc6e77e5c1f211a484a8a885" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" ADD CONSTRAINT "FK_41d2bfdf074ec9a1993dbfb5c80" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" DROP CONSTRAINT "FK_41d2bfdf074ec9a1993dbfb5c80"`);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" DROP CONSTRAINT "FK_2d8bc6e77e5c1f211a484a8a885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41d2bfdf074ec9a1993dbfb5c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d8bc6e77e5c1f211a484a8a88"`);
        await queryRunner.query(`DROP TABLE "users_subscribing_users"`);
    }

}
