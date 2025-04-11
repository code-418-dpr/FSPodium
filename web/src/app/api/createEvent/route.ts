// pages/api/createEvent.ts
import { NextResponse } from "next/server";
import { createEventRequest } from "@/data/event"; // Импортируйте функцию для создания события
import { EventLevel } from "@prisma/client";

export async function POST(request: Request) {
    try {
        // Извлекаем данные из тела запроса
        const {
            title,
            ageRange,
            start,
            end,
            isOnline,
            level,
            participantsCount,
            representationId,
            sportObjectData,
            disciplinesIds,
        } = await request.json();
        // Проверка обязательных полей
        if (!title || !ageRange || !start || !end || !level || !participantsCount) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Преобразуем строки с датами в объекты Date
        const event = await createEventRequest(
            title,
            ageRange,
            new Date(start), // Преобразуем строки в объект Date
            new Date(end), // Преобразуем строки в объект Date
            isOnline,
            level,
            participantsCount,
            representationId || null, // Передаем null, если нет representationId
            sportObjectData, // Место проведения, если оно есть
            disciplinesIds
        );

        // Возвращаем успешный ответ
        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error creating event",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
