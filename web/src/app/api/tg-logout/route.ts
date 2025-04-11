import { NextResponse } from "next/server";
import { deleteUserTelegramId } from "@/data/user";

export async function POST(request: Request) {
    try {
        const { tgId } = await request.json();
        await deleteUserTelegramId(tgId);
        return NextResponse.json({ message: "OK" });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Ошибка выхода из аккаунта",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}
