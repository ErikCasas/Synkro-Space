/*
  Warnings:

  - You are about to drop the column `meeting_room_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `work_station_id` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `entity_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_meeting_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_work_station_id_fkey";

-- DropIndex
DROP INDEX "public"."sessions_token_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "meeting_room_id",
DROP COLUMN "token",
DROP COLUMN "work_station_id",
ADD COLUMN     "entity_id" TEXT NOT NULL,
ADD COLUMN     "meetingRoomId" INTEGER,
ADD COLUMN     "workStationId" TEXT;

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "entity_type_id" TEXT NOT NULL,
    "meetingRoomId" INTEGER,
    "workStationId" TEXT,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_types" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "entity_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entity_types_type_key" ON "entity_types"("type");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES "meeting_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_workStationId_fkey" FOREIGN KEY ("workStationId") REFERENCES "work_station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_entity_type_id_fkey" FOREIGN KEY ("entity_type_id") REFERENCES "entity_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES "meeting_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_workStationId_fkey" FOREIGN KEY ("workStationId") REFERENCES "work_station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
