import { Event, EventLevel } from "@prisma/client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    event: any | null; // Подключаем стандартный тип события
};

export function EventDialog({ isOpen, setIsOpen, event }: Props): React.ReactNode {
    if (!event) {
        return null;
    } // Если события нет, ничего не рендерим

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md rounded-lg sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{event.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-4">
                    <p>
                        <strong className={event.Representation ? "" : "hidden"}>
                            Федеральный округ:
                        </strong>{" "}
                        {event.Representation
                            ? event.Representation.Region.FederalDistrict.name
                            : ""}
                    </p>
                    <p className="">
                        <strong>Уровень соревнования: </strong>
                        {(() => {
                            switch (event.level) {
                                case EventLevel.REGION:
                                    return "региональный";
                                case EventLevel.FEDREAL_DISTRICT:
                                    return "федеральный";
                                case EventLevel.ALL_RUSSIA:
                                    return "всероссийский";
                                default:
                                    return "Уровень не указан";
                            }
                        })()}
                    </p>
                    <p>
                        <strong> Представительство: </strong>
                        <span className="underline underline-offset-4">
                            {event.Representation
                                ? event.Representation.Region.name
                                : "центральное"}
                        </span>
                    </p>
                    <p className={event.Representation ? "py-3" : "hidden"}>
                        <strong>Контактная информация представительства: </strong>
                        <span className="block">
                            {event.Representation?.user?.name || "Данные отсутствуют"}
                        </span>
                        <span>{event.Representation?.user?.name || ""}</span>
                    </p>
                    <p className="text-lg underline underline-offset-4">
                        <strong>Тип события:&nbsp;</strong>
                        <span className={event.isOnline ? "text-green-400" : "text-red-500"}>
                            {event.isOnline ? "Онлайн" : "Оффлайн"}
                        </span>
                    </p>
                    <p className={event.SportObject ? "" : "hidden"}>
                        <strong>Место проведения:</strong>{" "}
                        {event.SportObject ? event.SportObject.name : ""},{" "}
                        {event.SportObject ? event.SportObject.address : ""}
                    </p>
                    <p
                        className={
                            event.DisciplinesOfEvent
                                ? "flex flex-col items-start justify-start"
                                : ""
                        }
                    >
                        <strong>Дисциплины: </strong>
                        <span className={event.DisciplinesOfEvent ? "block translate-x-6" : ""}>
                            {event.DisciplinesOfEvents?.length > 0
                                ? event.DisciplinesOfEvents?.map(
                                      (discipline: any, index: number) => (
                                          <span key={index} className="block">
                                              {" "}
                                              -&nbsp;
                                              {discipline.Discipline.name}
                                          </span>
                                      )
                                  )
                                : "на данный момент отсутствуют"}
                        </span>
                    </p>
                    <p>
                        <strong>Возрастная группа:</strong> {event.ageRange}
                    </p>
                    <p>
                        <strong>Количество участников:</strong> {event.participantsCount}
                    </p>
                    <p>
                        <strong>Дата события:</strong> {new Date(event.start).toLocaleDateString()}{" "}
                        - {new Date(event.end).toLocaleDateString()}
                    </p>
                </div>
                <DialogFooter>
                    <div className="flex w-full flex-row items-start justify-between">
                        {/* Кнопка добавления в Google Календарь */}
                        <a
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "h-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-2 text-lg hover:from-blue-500 hover:via-blue-600 hover:to-blue-700"
                            )}
                            href={getGoogleCalendarLink(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Добавить в Google Календарь
                        </a>
                        <button
                            className="block w-[30%] rounded-[8px] bg-gradient-to-r from-green-600 via-green-700 to-green-800 px-4 py-2 text-lg text-white transition hover:from-green-500 hover:via-green-600 hover:to-green-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
    function getGoogleCalendarLink(event: any): string {
        const start = new Date(event.start).toISOString().split("T")[0].replace(/-/g, "");
        const end = new Date(event.end);
        end.setDate(end.getDate() + 1); // Увеличиваем дату окончания на 1, чтобы было включительно
        const endFormatted = end.toISOString().split("T")[0].replace(/-/g, "");
        const details = `Место проведения: ${event.SportObject?.name || "Не указано"}, ${
            event.SportObject?.address || "Не указано"
        }`;

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
            event.title
        }&dates=${start}/${endFormatted}&details=${encodeURIComponent(details)}`;
    }
}
