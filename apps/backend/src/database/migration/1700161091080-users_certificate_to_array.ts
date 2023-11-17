import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersCertificateToArray1700161091080 implements MigrationInterface {
    name = 'UsersCertificateToArray1700161091080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."trainings_type_enum" RENAME TO "trainings_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_type_enum" AS ENUM('yoga', 'beg', 'boxing', 'power', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "type" TYPE "public"."trainings_type_enum" USING "type"::"text"::"public"."trainings_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_trainingtype_enum" RENAME TO "users_trainingtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_trainingtype_enum" AS ENUM('yoga', 'beg', 'boxing', 'power', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "trainingType" TYPE "public"."users_trainingtype_enum"[] USING "trainingType"::"text"::"public"."users_trainingtype_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."users_trainingtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "certificate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "certificate" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "certificate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "certificate" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."users_trainingtype_enum_old" AS ENUM('yoga', 'beg', 'boxing', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "trainingType" TYPE "public"."users_trainingtype_enum_old"[] USING "trainingType"::"text"::"public"."users_trainingtype_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."users_trainingtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_trainingtype_enum_old" RENAME TO "users_trainingtype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_type_enum_old" AS ENUM('yoga', 'beg', 'boxing', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`ALTER TABLE "trainings" ALTER COLUMN "type" TYPE "public"."trainings_type_enum_old" USING "type"::"text"::"public"."trainings_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."trainings_type_enum_old" RENAME TO "trainings_type_enum"`);
    }

}
