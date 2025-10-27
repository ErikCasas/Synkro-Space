-- DropForeignKey
ALTER TABLE "public"."session_participants" DROP CONSTRAINT "session_participants_session_id_fkey";

-- AddForeignKey
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
