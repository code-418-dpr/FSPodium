import { useEffect, useState } from "react";
import { getAndFilterEventsForAll } from "@/data/event";
import { EventLevel, Status } from "@prisma/client";
import { PrinterIcon } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Analytics() {
    const [events, setEvents] = useState<any[]>([]);
    const [participantData, setParticipantData] = useState<any[]>([]);
    const [levelData, setLevelData] = useState<any[]>([]);
    const groupParticipantsByMonth = (events: any[]) => {
        const monthlyData: { [key: string]: number } = {};

        events.forEach((event) => {
            const startDate = new Date(event.start);
            const month = startDate.getMonth();
            const year = startDate.getFullYear();
            const key = `${year}-${month}`;

            monthlyData[key] = (monthlyData[key] || 0) + (event.participantsCount || 0);
        });

        const sortedData = Object.entries(monthlyData)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split("-").map(Number);
                const [yearB, monthB] = keyB.split("-").map(Number);

                return yearA === yearB ? monthA - monthB : yearA - yearB;
            })
            .map(([key, value]) => {
                const [year, month] = key.split("-").map(Number);
                const monthName = new Date(year, month).toLocaleString("default", {
                    month: "short",
                });
                return {
                    name: `${monthName} ${year}`,
                    value,
                };
            });

        return sortedData;
    };
    const groupParticipantsByLevel = (events: any[]) => {
        const levelData: { [key: string]: number } = {};

        events.forEach((event) => {
            let level = event.level; // FEDERAL, ALL_RUSSIA, REGION
            if (level === "ALL_RUSSIA") {
                level = "ВСЕРОССИЙСКИЕ";
            } else if (level === "FEDREAL_DISTRICT") {
                level = "ФЕДЕРАЛЬНЫЕ";
            } else if (level === "REGION") {
                level = "РЕГИОНАЛЬНЫЕ";
            }
            levelData[level] = (levelData[level] || 0) + (event.participantsCount || 0);
        });

        return Object.entries(levelData).map(([name, value]) => ({ name, value }));
    };
    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getAndFilterEventsForAll();
            setEvents(fetchedEvents);
            const groupedByMonth = groupParticipantsByMonth(fetchedEvents);
            setParticipantData(groupedByMonth);
            const groupedByLevel = groupParticipantsByLevel(fetchedEvents);
            setLevelData(groupedByLevel);
        } catch (error) {
            console.error("Ошибка при загрузке событий: ", error);
        }
    };
    const getAllParticipantsCount = () => {
        return events.reduce(
            (total, event) =>
                total + (event.status === Status.APPROVED ? event.participantsCount : 0),
            0
        );
    };
    const getPopularRepresentation = () => {
        const representationCounts: Record<string, number> = events.reduce((counts, event) => {
            if (event.Representation) {
                const name = event.Representation.Region.name;
                counts[name] = (counts[name] || 0) + 1;
            } else {
                const name = "Центральное";
                counts[name] = (counts[name] || 0) + 1;
            }
            return counts;
        }, {});
        const maxCount = Math.max(...Object.values(representationCounts));
        return Object.entries(representationCounts)
            .filter(([_, count]) => count === maxCount)
            .map(([name, _]) => {
                return name;
            })
            .join(", ");
    };
    const getMaxCountEvents = () => {
        const maxCountEvent: Record<string, number> = events.reduce((counts, event) => {
            const name = event.title;
            counts[name] = event.participantsCount;
            return counts;
        }, {});
        const maxCount = Math.max(...Object.values(maxCountEvent));
        const result = Object.entries(maxCountEvent).find(([_, count]) => count === maxCount);
        return result || [];
    };
    const getPopularLevel = () => {
        const levelCounts: Record<string, number> = events.reduce((counts, event) => {
            if (event.status === Status.APPROVED) {
                const level = event.level;
                counts[level] = (counts[level] || 0) + 1;
            }
            return counts;
        }, {});
        const maxCount = Math.max(...Object.values(levelCounts));

        return Object.entries(levelCounts)
            .filter(([_, count]) => count === maxCount)
            .map(([level, _]) => {
                switch (level) {
                    case EventLevel.REGION:
                        return "Региональные";
                    case EventLevel.FEDREAL_DISTRICT:
                        return "Федеральные";
                    case EventLevel.ALL_RUSSIA:
                        return "Всероссийские";
                    default:
                        return level;
                }
            })
            .join(", ");
    };
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const getAllParticipantCountLastMonth = events.reduce((total, event) => {
        const eventStartDate = new Date(event.start);
        const eventEndDate = new Date(event.end);
        const isLastMonthEvent =
            (eventStartDate >= previousMonthStart && eventStartDate <= previousMonthEnd) ||
            (eventEndDate >= previousMonthStart && eventEndDate <= previousMonthEnd) ||
            (eventStartDate <= previousMonthStart && eventEndDate >= previousMonthEnd);
        return (
            total +
            (isLastMonthEvent && event.status === Status.APPROVED ? event.participantsCount : 0)
        );
    }, 0);
    const popularRepresentation = getPopularRepresentation();
    const maxEventsCount = getMaxCountEvents();
    const popularDiscipline = getPopularLevel();
    const pendingEventsCount = events.filter((event) => event.status === Status.PENDING).length;
    const onlineEvents = events.filter((event) => {
        const eventStartDate = new Date(event.start);
        return (
            event.isOnline === true &&
            event.status === Status.APPROVED &&
            eventStartDate >= firstDayOfMonth &&
            eventStartDate <= lastDayOfMonth
        );
    }).length;
    const offlineEvents = events.filter((event) => {
        const eventStartDate = new Date(event.start);
        console.log(events);
        return (
            event.isOnline === false &&
            event.status === Status.APPROVED &&
            eventStartDate >= firstDayOfMonth &&
            eventStartDate <= lastDayOfMonth
        );
    }).length;
    const allParticipantsCount = getAllParticipantsCount();
    useEffect(() => {
        fetchEvents();
    }, []);
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Аналитика</h2>
                <Button className="print:hidden" variant="outline" onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 h-4 w-4" />
                    Распечатать
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Количество участников по месяцам</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={participantData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B83F6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Активность по соревнованиям</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={levelData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Bar dataKey="value" fill="#3B83F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего заявок</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{events.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {pendingEventsCount} на рассмотрении
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Количество спортсменов
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allParticipantsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            +{getAllParticipantCountLastMonth} за прошлый месяц
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Наиболее активное представительство
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{popularRepresentation}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Самое масштабное событие
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {maxEventsCount && maxEventsCount.length > 0 ? (
                            <>
                                <div className="text-xl font-bold">{maxEventsCount[0]}</div>
                                <p className="text-xs text-muted-foreground">
                                    Участников: {maxEventsCount[1]}
                                </p>
                            </>
                        ) : (
                            <p className="text-xs text-muted-foreground">Нет данных</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Популярные виды соревнований
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{popularDiscipline}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Виды событий в этом месяце
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">
                            {onlineEvents > offlineEvents
                                ? `Онлайн: ${onlineEvents}`
                                : `Офлайн: ${offlineEvents}`}
                        </div>
                        <div className="text-xl font-bold">
                            {onlineEvents < offlineEvents
                                ? `Онлайн: ${onlineEvents}`
                                : `Офлайн: ${offlineEvents}`}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
