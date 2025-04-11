import { NextResponse } from "next/server";
import { getAllFederalDistricts } from "@/data/federalDistrict";

export async function GET() {
    try {
        const regions = await getAllFederalDistricts();
        return NextResponse.json(regions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
    }
}
