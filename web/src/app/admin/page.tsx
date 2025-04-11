import { redirect } from "next/navigation";
import { getPendingEvents } from "@/data/event";
import { getNotifications } from "@/data/notifications";
import { getRepresentations } from "@/data/representation";
import { getAllRepresentationRequests } from "@/data/representationRequest";
import { getUserById } from "@/data/user";
import { auth } from "@/security/auth";
import { Status, UserRole } from "@prisma/client";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage(): Promise<React.ReactNode> {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== UserRole.CENTRAL_REP) {
        redirect("/regional");
    }

    const applications = await getAllRepresentationRequests();

    // Сортируем заявки так, чтобы заявки с статусом PENDING были в начале
    const sortedApplications = applications.sort((a, b) => {
        if (a.status === Status.PENDING && b.status !== Status.PENDING) {
            return -1;
        }
        if (a.status !== Status.PENDING && b.status === Status.PENDING) {
            return 1;
        }
        return 0;
    });

    const representations = await getRepresentations();
    const events = await getPendingEvents();
    const notifications = await getNotifications(session.user.id!);
    const user = await getUserById(session.user.id!);

    if (!user) {
        redirect("/admin");
    }

    return (
        <AdminDashboard
            applications={sortedApplications}
            representations={representations}
            events={events}
            notifications={notifications}
            user={user}
        />
    );
}
