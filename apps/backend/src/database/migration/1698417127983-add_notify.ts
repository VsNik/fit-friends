import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotify1698417127983 implements MigrationInterface {
    name = 'AddNotify1698417127983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL, "coachId" uuid NOT NULL, "subscribeEmails" character varying array NOT NULL, "createdAt" character varying NOT NULL, "trainingId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_d94a8f83d06c221fbaaad742937" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_d94a8f83d06c221fbaaad742937"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
