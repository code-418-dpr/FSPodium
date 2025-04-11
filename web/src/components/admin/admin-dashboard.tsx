"use client";

import { useEffect, useState } from "react";
import {
    EventWithResults,
    RepresentationRequestWithRegion,
    RepresentationWithRegionAndUser,
} from "@/prisma/types";
import { Notification, User } from "@prisma/client";
import { BarChart2, Bell, FileText, Users } from "lucide-react";

import { Analytics } from "@/components/admin/analytics";
import { Representations } from "@/components/admin/representations";
import { Notifications } from "@/components/shared/notifications";
import { Sidebar } from "@/components/shared/sidebar";

import { AdminApplications } from "./admin-applications";

export function AdminDashboard({
    applications,
    representations,
    events,
    notifications,
    user,
}: {
    applications: RepresentationRequestWithRegion[];
    representations: RepresentationWithRegionAndUser[];
    events: EventWithResults[];
    notifications: Notification[];
    user: User;
}) {
    const [activeSection, setActiveSection] = useState("analytics");

    useEffect(() => {
        const storedSection = localStorage.getItem("adminActiveSection");
        if (storedSection) {
            setActiveSection(storedSection);
        }
    }, []);

    const handleSetActiveSection = (sectionId: string) => {
        setActiveSection(sectionId);
        localStorage.setItem("adminActiveSection", sectionId);
    };

    const menuItems = [
        { name: "Аналитика", icon: BarChart2, id: "analytics" },
        { name: "Заявки", icon: FileText, id: "applications" },
        { name: "Представительства", icon: Users, id: "representations" },
        { name: "Уведомления", icon: Bell, id: "notifications" },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case "applications":
                return <AdminApplications applications={applications} events={events} />;
            case "representations":
                return <Representations representations={representations} />;
            case "notifications":
                return <Notifications notifications={notifications} user={user} />;
            default:
                return <Analytics />;
        }
    };

    return (
        <div className="flex flex-1">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={handleSetActiveSection}
                menuItems={menuItems}
            />
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
}
