"use client";

import { EventWithResults } from "@/prisma/types";
import { Discipline, Representation, User } from "@prisma/client";

import { NewEventDialog } from "../dialogs/new-event-dialog";
import { EventApplications } from "../shared/event-applications";

type EventsProps = {
    events: EventWithResults[];
    disciplines: Discipline[];
    representation: Representation;
};

export function Events({ events, disciplines, representation }: EventsProps) {
    return (
        <div className="space-y-4">
            <EventApplications events={events} isAdmin={false} />
            <NewEventDialog disciplines={disciplines} representation={representation} />
        </div>
    );
}
