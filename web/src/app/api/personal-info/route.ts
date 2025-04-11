import { NextResponse } from "next/server";
import { getUserByTgId } from "@/data/user";

import { db } from "@/lib/db";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const tgId = Number(url.searchParams.get("tgId"));
        const user = await getUserByTgId(tgId);
        const response = await fetch(process.env.BOT_URL + "/personal-info/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: tgId,
                name: user!.name,
                email: user!.email,
                role: user!.role,
                federal_district: (await db.representation.findUnique({
                    where: { userId: user!.id },
                    include: { Region: { include: { FederalDistrict: true } } },
                }))!.Region.FederalDistrict.name,
                region: (
                    await db.representation.findUnique({
                        where: { userId: user!.id },
                        include: { Region: true },
                    })
                )?.Region.name,
            }),
        });
        return NextResponse.json({}, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Ошибка получения персональной информации",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
