/*
  Warnings:

  - You are about to drop the column `seating_quantity` on the `meeting_rooms` table. All the data in the column will be lost.
  - You are about to drop the column `seating_id` on the `session_participants` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `session_participants` table. All the data in the column will be lost.
  - You are about to drop the `seatings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capacity` to the `meeting_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."seatings" DROP CONSTRAINT "seatings_meeting_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."session_participants" DROP CONSTRAINT "session_participants_seating_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_meeting_room_id_fkey";

-- DropIndex
DROP INDEX "public"."session_participants_token_key";

-- AlterTable
ALTER TABLE "meeting_rooms" DROP COLUMN "seating_quantity",
ADD COLUMN     "capacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "session_participants" DROP COLUMN "seating_id",
DROP COLUMN "token";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "work_station_id" TEXT,
ALTER COLUMN "start_at" DROP DEFAULT,
ALTER COLUMN "meeting_room_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "public"."seatings";

-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "work_station_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_station_name_key" ON "work_station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_meeting_room_id_fkey" FOREIGN KEY ("meeting_room_id") REFERENCES "meeting_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_work_station_id_fkey" FOREIGN KEY ("work_station_id") REFERENCES "work_station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
