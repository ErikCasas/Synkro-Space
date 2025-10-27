/*
  Warnings:

  - You are about to drop the column `meetingRoomId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `workStationId` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_meetingRoomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_workStationId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "meetingRoomId",
DROP COLUMN "workStationId";
