import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699107190108 implements MigrationInterface {
    name = 'Init1699107190108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL, "rating" integer NOT NULL DEFAULT '0', "text" character varying NOT NULL, "createdAt" character varying NOT NULL, "userId" uuid, "trainingId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_type_enum" AS ENUM('abonement')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymenttype_enum" AS ENUM('visa', 'mir', 'umoney')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "type" "public"."orders_type_enum" NOT NULL, "price" integer NOT NULL, "count" integer NOT NULL, "totalPrice" integer NOT NULL, "paymentType" "public"."orders_paymenttype_enum" NOT NULL, "createdAt" character varying NOT NULL, "userId" uuid, "trainingId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_level_enum" AS ENUM('novice', 'amateur', 'professional')`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_type_enum" AS ENUM('yoga', 'beg', 'boxing', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_duration_enum" AS ENUM('10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин')`);
        await queryRunner.query(`CREATE TYPE "public"."trainings_gender_enum" AS ENUM('male', 'female', 'any')`);
        await queryRunner.query(`CREATE TABLE "trainings" ("id" uuid NOT NULL, "title" character varying NOT NULL, "bgImage" character varying NOT NULL, "level" "public"."trainings_level_enum" NOT NULL, "type" "public"."trainings_type_enum" NOT NULL, "duration" "public"."trainings_duration_enum" NOT NULL, "price" integer NOT NULL, "calories" integer NOT NULL, "description" character varying NOT NULL, "gender" "public"."trainings_gender_enum" NOT NULL, "video" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '0', "isSpecial" boolean NOT NULL, "ordersCount" integer NOT NULL DEFAULT '0', "ordersSumm" integer NOT NULL DEFAULT '0', "createdAt" character varying NOT NULL, "coachId" uuid, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'any')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'coach')`);
        await queryRunner.query(`CREATE TYPE "public"."users_location_enum" AS ENUM('pionerskaya', 'udelnaya', 'zvezdnaya', 'sportivnaya')`);
        await queryRunner.query(`CREATE TYPE "public"."users_traininglevel_enum" AS ENUM('novice', 'amateur', 'professional')`);
        await queryRunner.query(`CREATE TYPE "public"."users_trainingtype_enum" AS ENUM('yoga', 'beg', 'boxing', 'stretching', 'crossfit', 'aerobic', 'pilates')`);
        await queryRunner.query(`CREATE TYPE "public"."users_trainingtime_enum" AS ENUM('10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'any', "birthDay" character varying NOT NULL DEFAULT '', "role" "public"."users_role_enum" NOT NULL, "bio" character varying NOT NULL DEFAULT '', "location" "public"."users_location_enum" NOT NULL, "bgImage" character varying NOT NULL, "trainingLevel" "public"."users_traininglevel_enum" NOT NULL, "trainingType" "public"."users_trainingtype_enum" array NOT NULL, "trainingTime" "public"."users_trainingtime_enum", "loseCalories" integer, "burnCalories" integer, "ready" boolean, "certificate" character varying, "merits" character varying, "personalTraining" boolean, "createdAt" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "sessionId" uuid NOT NULL, "expiresTo" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balans" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "count" integer NOT NULL DEFAULT '0', "createdAt" character varying NOT NULL, "trainingId" uuid, CONSTRAINT "PK_72d2149c8cc9614e74f022a8f6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL, "coachId" uuid NOT NULL, "coachName" character varying NOT NULL, "subscribeEmails" character varying array NOT NULL, "trainingTitle" character varying NOT NULL, "trainingImage" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alerts" ("id" uuid NOT NULL, "fromUserId" uuid NOT NULL, "userId" uuid NOT NULL, "text" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."invitations_status_enum" AS ENUM('waiting', 'rejected', 'accepted')`);
        await queryRunner.query(`CREATE TABLE "invitations" ("id" uuid NOT NULL, "initiatorId" uuid NOT NULL, "toUserId" uuid NOT NULL, "status" "public"."invitations_status_enum" NOT NULL DEFAULT 'waiting', "createdAt" character varying NOT NULL, "changedAt" character varying NOT NULL, CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_followers_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_ee8a9c5a097f32b484caaeb3de7" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d63f6043394b4d32343bdea11" ON "users_followers_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_1433e3275a501bc09f5c33c7ca" ON "users_followers_users" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "users_subscribing_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_9f0113e52ef767128bf062a4ec7" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d8bc6e77e5c1f211a484a8a88" ON "users_subscribing_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_41d2bfdf074ec9a1993dbfb5c8" ON "users_subscribing_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_38da392f49335976e04d3aecfc8" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cd6901ca9341e67d541fdead013" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_81435aa19155723e2c139759bb4" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balans" ADD CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_8d63f6043394b4d32343bdea11d" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" ADD CONSTRAINT "FK_2d8bc6e77e5c1f211a484a8a885" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" ADD CONSTRAINT "FK_41d2bfdf074ec9a1993dbfb5c80" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" DROP CONSTRAINT "FK_41d2bfdf074ec9a1993dbfb5c80"`);
        await queryRunner.query(`ALTER TABLE "users_subscribing_users" DROP CONSTRAINT "FK_2d8bc6e77e5c1f211a484a8a885"`);
        await queryRunner.query(`ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2"`);
        await queryRunner.query(`ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_8d63f6043394b4d32343bdea11d"`);
        await queryRunner.query(`ALTER TABLE "balans" DROP CONSTRAINT "FK_2d06b1cd5c6b5546d70aea4d194"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_81435aa19155723e2c139759bb4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cd6901ca9341e67d541fdead013"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_38da392f49335976e04d3aecfc8"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41d2bfdf074ec9a1993dbfb5c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d8bc6e77e5c1f211a484a8a88"`);
        await queryRunner.query(`DROP TABLE "users_subscribing_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1433e3275a501bc09f5c33c7ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d63f6043394b4d32343bdea11"`);
        await queryRunner.query(`DROP TABLE "users_followers_users"`);
        await queryRunner.query(`DROP TABLE "invitations"`);
        await queryRunner.query(`DROP TYPE "public"."invitations_status_enum"`);
        await queryRunner.query(`DROP TABLE "alerts"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "balans"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_trainingtime_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_trainingtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_traininglevel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_location_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_duration_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trainings_level_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymenttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_type_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
