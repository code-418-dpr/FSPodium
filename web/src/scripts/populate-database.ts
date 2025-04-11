import { EventLevel, PrismaClient, Status, User, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

import eventTitles from "./event-titles.json";

const prisma = new PrismaClient();

export async function createUser(
    email: string,
    password: string,
    role: UserRole,
    name: string
): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
            emailNotifications: false,
            name,
        },
    });
}

async function populateDatabase(): Promise<void> {
    const randomNames = [
        "Иванов Петр Сергеевич",
        "Смирнова Анна Владимировна",
        "Кузнецов Дмитрий Александрович",
        "Попова Елена Михайловна",
        "Соколов Андрей Николаевич",
        "Морозова Ольга Игоревна",
        "Волков Максим Дмитриевич",
        "Лебедева Татьяна Алексеевна",
        "Козлов Артем Владиславович",
        "Новикова Мария Сергеевна",
    ];

    const users = [
        { email: "admin@admin.com", password: "admin", role: "CENTRAL_REP", name: randomNames[0] },
        {
            email: "region1@fsp-russia.com",
            password: "11111111",
            role: "REGIONAL_REP",
            name: randomNames[1],
        },
        {
            email: "region2@fsp-russia.com",
            password: "11111111",
            role: "REGIONAL_REP",
            name: randomNames[2],
        },
        {
            email: "region3@fsp-russia.com",
            password: "11111111",
            role: "REGIONAL_REP",
            name: randomNames[3],
        },
        {
            email: "region4@fsp-russia.com",
            password: "11111111",
            role: "REGIONAL_REP",
            name: randomNames[4],
        },
    ];

    const userIds = [];
    const representationIds = [];

    try {
        const existingAdmin = await prisma.user.findUnique({
            where: {
                email: users[0].email,
            },
        });

        if (existingAdmin) {
            console.log("Database already populated");
            return;
        }

        for (const user of users) {
            const createdUser = await createUser(
                user.email,
                user.password,
                user.role as UserRole,
                user.name
            );
            if (user.role === "REGIONAL_REP") {
                userIds.push(createdUser.id);
            }
        }
        const regions = await prisma.region.findMany();
        const randomRegions = regions.sort(() => Math.random() - 0.5).slice(0, 4);

        for (let i = 0; i < 4; i++) {
            const representation = await prisma.representation.create({
                data: {
                    regionId: randomRegions[i].id,
                    userId: userIds[i],
                },
            });
            representationIds.push(representation.id);
        }

        const eventStatuses = [Status.PENDING, Status.APPROVED, Status.REFUSED];
        const startDate = new Date(2024, 0, 1);
        const endDate = new Date(2024, 11, 31);
        const ageRanges = ["16+", "18+", "14-17", "21+", "18-21"];
        const eventLevels = [EventLevel.ALL_RUSSIA, EventLevel.FEDREAL_DISTRICT, EventLevel.REGION];

        for (let i = 0; i < 100; i++) {
            const randomRepIndex = Math.floor(Math.random() * representationIds.length);
            const eventStartDate = new Date(
                startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
            );
            const eventEndDate = new Date(
                eventStartDate.getTime() + Math.random() * (7 * 24 * 60 * 60 * 1000)
            );

            const randomAgeRangeIndex = Math.floor(Math.random() * ageRanges.length);
            const eventLevel = eventLevels[Math.floor(Math.random() * eventLevels.length)];
            const participantsCount = Math.floor(Math.random() * 100) + 1;
            const status = eventStatuses[Math.floor(Math.random() * eventStatuses.length)];
            const refusalReason = status === Status.REFUSED ? "-" : null;
            const title = eventTitles[Math.floor(Math.random() * eventTitles.length)];

            await prisma.event.create({
                data: {
                    title,
                    ageRange: ageRanges[randomAgeRangeIndex],
                    start: eventStartDate,
                    end: eventEndDate,
                    isOnline: true,
                    level: eventLevel,
                    participantsCount,
                    representationId: representationIds[randomRepIndex],
                    sportObjectsId: null,
                    refusalReason,
                    status,
                },
            });
        }
    } catch (error) {
        console.error("Error populating database:", error);
    } finally {
        await prisma.$disconnect();
    }
    console.log("Database populated successfully.");
}

populateDatabase();
