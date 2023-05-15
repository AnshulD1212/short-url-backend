import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortUrlTable1684136847851 implements MigrationInterface {
    name = 'ShortUrlTable1684136847851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shortUrl" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "shortUrl" character varying NOT NULL, "clickCount" integer NOT NULL, "shortenedCount" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_777c22e5ccf52ab954c6692cfdc" UNIQUE ("url"), CONSTRAINT "UQ_45eb2b2b006ff233a6df04327f0" UNIQUE ("shortUrl"), CONSTRAINT "PK_e2d64e814c6a2772a7b111bfe48" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shortUrl"`);
    }

}
