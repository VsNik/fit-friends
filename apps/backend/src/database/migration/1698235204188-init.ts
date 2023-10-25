import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698235204188 implements MigrationInterface {
    name = 'Init1698235204188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL, "rating" integer NOT NULL, "text" character varying NOT NULL, "createdAt" character varying NOT NULL, "userId" uuid, "trainingId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_38da392f49335976e04d3aecfc8" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cd6901ca9341e67d541fdead013" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_81435aa19155723e2c139759bb4" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_81435aa19155723e2c139759bb4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cd6901ca9341e67d541fdead013"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_38da392f49335976e04d3aecfc8"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
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
