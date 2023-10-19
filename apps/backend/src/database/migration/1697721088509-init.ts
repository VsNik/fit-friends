import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697721088509 implements MigrationInterface {
    name = 'Init1697721088509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."orders_type_enum" NOT NULL, "training" character varying NOT NULL, "price" integer NOT NULL, "count" integer NOT NULL, "totalPrice" integer NOT NULL, "paymentType" "public"."orders_paymenttype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trainings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bgImage" character varying NOT NULL, "level" "public"."trainings_level_enum" NOT NULL, "type" "public"."trainings_type_enum" NOT NULL, "duration" "public"."trainings_duration_enum" NOT NULL, "price" integer NOT NULL, "calories" integer NOT NULL, "description" character varying NOT NULL, "gender" "public"."trainings_gender_enum" NOT NULL, "video" character varying NOT NULL, "rating" integer NOT NULL, "isSpecial" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "coachId" uuid, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'any', "birthDay" character varying NOT NULL DEFAULT '', "role" "public"."users_role_enum" NOT NULL, "bio" character varying NOT NULL DEFAULT '', "location" "public"."users_location_enum" NOT NULL, "bgImage" character varying NOT NULL, "trainingLevel" "public"."users_traininglevel_enum" NOT NULL, "trainingType" "public"."users_trainingtype_enum" array NOT NULL, "trainingTime" "public"."users_trainingtime_enum", "loseCalories" integer, "burnCalories" integer, "ready" boolean, "certificate" character varying, "merits" character varying, "personalTraining" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "userId" uuid, "trainingId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_81435aa19155723e2c139759bb4" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_38da392f49335976e04d3aecfc8" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_38da392f49335976e04d3aecfc8"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_81435aa19155723e2c139759bb4"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
