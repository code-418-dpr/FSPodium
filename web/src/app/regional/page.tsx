import { redirect } from "next/navigation";
import { getAllDisciplines } from "@/data/discipline";
import { getEventsFromUser } from "@/data/event";
import { getNotifications } from "@/data/notifications";
import { getRepresentationByUserId } from "@/data/representation";
import { getUserById } from "@/data/user";
import { auth } from "@/security/auth";
import { UserRole } from "@prisma/client";

import { RegionalDashboard } from "@/components/regional/regional-dashboard";

export default async function RegionalPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== UserRole.REGIONAL_REP) {
        redirect("/admin");
    }

    const user = await getUserById(session.user.id!);
    const events = await getEventsFromUser(session.user.id!);
    const representation = await getRepresentationByUserId(session.user.id!);
    const notifications = await getNotifications(session.user.id!);
    const disciplines = await getAllDisciplines();

    if (!user || !representation) {
        redirect("/regional");
    }

    return (
        <RegionalDashboard
            user={user}
            events={events}
            notifications={notifications}
            representation={representation}
            disciplines={disciplines}
        />
    );
}
