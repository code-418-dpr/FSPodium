import { NextResponse } from "next/server";
import { answerSupportMessage } from "@/data/supportMessage";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supportMessageId = String(body.supportMessageId);
        const response = body.response;
        await answerSupportMessage(supportMessageId, response);
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Ошибка обработки обращения в техподдержку",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}
