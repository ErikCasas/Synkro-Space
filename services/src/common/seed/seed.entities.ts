import { prisma } from '@src/lib/prisma';
import logger from 'jet-logger';

export async function seedEntities(): Promise<void> {
    try {
        logger.info('🚀 Seeding entity types...');

        const meetingRoomType = await prisma.entityType.upsert({
            where: { type: 'MeetingRoom' },
            update: {},
            create: { type: 'MeetingRoom' },
        });

        const workStationType = await prisma.entityType.upsert({
            where: { type: 'WorkStation' },
            update: {},
            create: { type: 'WorkStation' },
        });

        logger.info('✅ Entity types inserted');

        const meetingRoomsData = [
            { capacity: 6, direction: 'Calle 45 #10-20', roomCode: 'ROOM-A1' },
            { capacity: 8, direction: 'Calle 45 #10-20', roomCode: 'ROOM-B1' },
            { capacity: 10, direction: 'Calle 45 #10-20', roomCode: 'ROOM-C1' },
            { capacity: 12, direction: 'Calle 45 #10-20', roomCode: 'ROOM-D1' },
        ];

        for (const data of meetingRoomsData) {
            const meetingRoom = await prisma.meetingRoom.upsert({
                where: { roomCode: data.roomCode },
                update: {},
                create: data,
            });

            await prisma.entity.upsert({
                where: {
                    name: `Entity-${meetingRoom.roomCode}`
                },
                update: {},
                create: {
                    name: `Entity-${meetingRoom.roomCode}`,
                    entityTypeId: meetingRoomType.id,
                    meetingRoomId: meetingRoom.id,
                },
            });
        }

        logger.info('🏢 MeetingRooms and related Entities inserted');

        const workStationsData = [
            { name: 'WorkStation-A1' },
            { name: 'WorkStation-B1' },
            { name: 'WorkStation-C1' },
            { name: 'WorkStation-D1' },
        ];

        for (const data of workStationsData) {
            const workStation = await prisma.workStation.upsert({
                where: { name: data.name },
                update: {},
                create: data,
            });

            await prisma.entity.upsert({
                where: { name: `Entity-${workStation.name}` },
                update: {},
                create: {
                    name: `Entity-${workStation.name}`,
                    entityTypeId: workStationType.id,
                    workStationId: workStation.id,
                },
            });
        }

        logger.info('💻 WorkStations and related Entities inserted');
        logger.info('🎉 Seeding complete!');
    } catch (error) {
        logger.err('❌ Error seeding entities');
        logger.err(error instanceof Error ? error.message : String(error));
    } finally {
        await prisma.$disconnect();
    }
}
