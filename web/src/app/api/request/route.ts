"use server";

import { NextResponse } from "next/server";
import { acceptEventRequest, declineEventRequest } from "@/data/event";
import { adminChangeRepresentationRequestStatus } from "@/data/representationRequest";

export async function POST(request: Request) {
    try {
        const { requestId, type, refusalReason } = await request.json();
        if (!requestId || !type) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (type === "representation") {
            if (refusalReason) {
                await adminChangeRepresentationRequestStatus(requestId, false, refusalReason);
            } else {
                await adminChangeRepresentationRequestStatus(requestId, true);
            }
        } else if (type === "event") {
            if (refusalReason) {
                await declineEventRequest(requestId, refusalReason);
            } else {
                await acceptEventRequest(requestId);
            }
        }
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error updating request",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
