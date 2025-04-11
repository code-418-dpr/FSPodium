import { NextResponse } from "next/server";
import { getAllRegions } from "@/data/region";

export async function GET() {
    try {
        const districts = await getAllRegions();
        return NextResponse.json(districts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
    }
}
