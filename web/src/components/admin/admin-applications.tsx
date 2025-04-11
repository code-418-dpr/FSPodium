import { EventWithResults, RepresentationRequestWithRegion } from "@/prisma/types";

import { EventApplications } from "../shared/event-applications";
import { RepresentationApplications } from "../shared/representation-applications";

export function AdminApplications({
    applications,
    events,
}: {
    applications: RepresentationRequestWithRegion[];
    events: EventWithResults[];
}) {
    return (
        <div className="flex flex-col gap-8">
            <EventApplications events={events} isAdmin={true} />
            <RepresentationApplications applications={applications} />
        </div>
    );
}
