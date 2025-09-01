-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('user', 'admin', 'visitor');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'user';
