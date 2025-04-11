import { NextResponse } from "next/server";
import { createSupportMessage } from "@/data/supportMessage";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const tgId = Number(body.tgId);
        const request_ = String(body.request);
        await createSupportMessage(tgId, request_);
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
