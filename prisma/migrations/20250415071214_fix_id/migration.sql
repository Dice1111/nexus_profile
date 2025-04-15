-- AlterTable
CREATE SEQUENCE test_id_seq;
ALTER TABLE "test" ALTER COLUMN "id" SET DEFAULT nextval('test_id_seq'),
ADD CONSTRAINT "test_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE test_id_seq OWNED BY "test"."id";

-- DropIndex
DROP INDEX "test_id_key";
