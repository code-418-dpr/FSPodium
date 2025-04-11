"use client";

import { useEffect, useState } from "react";
import { EventWithResults, RepresentationWithRegionAndUser } from "@/prisma/types";
import { Discipline, Notification, User } from "@prisma/client";
import { BarChart2, BellIcon, FileTextIcon, HelpCircleIcon, UserIcon } from "lucide-react";

import { Events } from "@/components/regional/events";
import { Help } from "@/components/regional/help";
import { Profile } from "@/components/regional/profile";
import { Notifications } from "@/components/shared/notifications";
import { Sidebar } from "@/components/shared/sidebar";

import { Analytics } from "./analytics";

type Props = {
    events: EventWithResults[];
    notifications: Notification[];
    representation: RepresentationWithRegionAndUser;
    disciplines: Discipline[];
    user: User;
};

export function RegionalDashboard({
    events,
    notifications,
    representation,
    disciplines,
    user,
}: Props) {
    const [activeSection, setActiveSection] = useState("analytics");

    useEffect(() => {
        const storedSection = localStorage.getItem("activeSection");
        if (storedSection) {
            setActiveSection(storedSection);
        }
    }, []);

    const handleSetActiveSection = (sectionId: string) => {
        setActiveSection(sectionId);
        localStorage.setItem("activeSection", sectionId);
    };

    const menuItems = [
        { name: "Аналитика", icon: BarChart2, id: "analytics" },
        { name: "События", icon: FileTextIcon, id: "events" },
        { name: "Профиль", icon: UserIcon, id: "profile" },
        { name: "Уведомления", icon: BellIcon, id: "notifications" },
        { name: "Справка", icon: HelpCircleIcon, id: "help" },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case "analytics":
                return <Analytics user={user} />;
            case "profile":
                return <Profile representation={representation} />;
            case "notifications":
                return <Notifications notifications={notifications} user={user} />;
            case "help":
                return <Help />;
            case "events":
                return (
                    <Events
                        events={events}
                        disciplines={disciplines}
                        representation={representation}
                    />
                );
            default:
                return <Analytics user={user} />;
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
