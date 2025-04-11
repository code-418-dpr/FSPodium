import React, { useEffect, useMemo, useState } from "react";
import { EventClickArg } from "@fullcalendar/core/index.js";
import ruLocale from "@fullcalendar/core/locales/ru";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@prisma/client";
import { map } from "zod";

import { Combobox } from "@/components/ui/combobox";

import { EventDialog } from "./EventDialog";

interface Item {
    id: string; // Уникальный идентификатор округа
    name: string; // Название округа
}
const Calendar: React.FC = () => {
    const [data, setData] = useState<any[]>([]); // Вся информация о событии
    const [formattedData, setFormattedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false); // Управление открытием диалога
    const [selectedEventData, setSelectedEventData] = useState<any | null>(null); // Полная информация о выбранном событии
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedFederalDistict, setSelecterFederalDistrict] = useState<string>("");
    const [representationItems, setRepresentation] = useState<Item[]>([]);
    const [federalDistrictsItems, setFederalDistricts] = useState<Item[]>([]);

    const filterEvents = (): any[] => {
        return data.filter((event) => {
            const isApproved = event.status === "APPROVED";

            const isSupremeRepresentationSelected =
                selectedDistrict === "null" && event.Representation === null;

            const hasMatchingFederalDistrict =
                selectedFederalDistict &&
                event.Representation?.Region?.FederalDistrict?.id === selectedFederalDistict;

            const hasMatchingRepresentation =
                selectedDistrict && event.Representation?.Region?.id === selectedDistrict;

            if (selectedFederalDistict && selectedDistrict) {
                // Если выбраны и федеральный округ, и представительство
                return isApproved && hasMatchingFederalDistrict && hasMatchingRepresentation;
            } else if (selectedDistrict === "null") {
                // Если выбрано "Верховное представительство ФСП"
                return isApproved && isSupremeRepresentationSelected;
            } else if (selectedFederalDistict) {
                // Если выбран только федеральный округ
                return isApproved && hasMatchingFederalDistrict;
            } else if (selectedDistrict) {
                // Если выбрано только представительство
                return isApproved && hasMatchingRepresentation;
            }

            return isApproved; // Если ничего не выбрано, возвращаем только APPROVED
        });
    };

    const filteredEvents = useMemo(
        () => filterEvents(),
        [data, selectedFederalDistict, selectedDistrict]
    );
    const fetchRepresentations = async () => {
        try {
            const representationResponse = await fetch("/api/calendar/representation");
            if (!representationResponse.ok) {
                throw new Error("Error connection API Representation");
            }
            const representationResult = await representationResponse.json();
            const representations = [
                { id: "null", name: "Центральное" }, // Добавляем элемент вручную
                ...representationResult.map((representation: any) => ({
                    id: representation.id,
                    name: representation.name,
                })),
            ];
            setRepresentation(representations);
        } catch (error) {
            console.error("Error loading Representations: ", error);
        }
    };
    const fetchFederalDistricts = async () => {
        try {
            const federalDistrictsResponse = await fetch("/api/calendar/federalDistrict");
            if (!federalDistrictsResponse.ok) {
                throw new Error("Error connection API FederalDistrict");
            }
            const federalDistrictsResult = await federalDistrictsResponse.json();
            const federalDistricts = federalDistrictsResult.map((federalDistrict: any) => ({
                id: federalDistrict.id,
                name: federalDistrict.name,
            }));
            setFederalDistricts(federalDistricts);
        } catch (error) {
            console.error("Error loading Federal Districts: ", error);
        }
    };
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/calendar");
            if (!response.ok) {
                throw new Error("Ошибка подключения к API");
            }

            const result = await response.json();
            setData(result);

            const formattedResult = result.map((event: Event) => ({
                id: event.id,
                title: event.title || "Событие ",
                start: event.start,
                end: event.end,
            }));
            setFormattedData(formattedResult);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Произошла неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchRepresentations();
        fetchFederalDistricts();
    }, []);

    const handleEventClick = (info: EventClickArg): void => {
        const selectedData = data.find((e: Event) => e.id === String(info.event.id));
        setSelectedEventData(selectedData || null); // Устанавливаем всю информацию о событии для диалогового окна
        setIsDialogOpen(true);
    };

    return (
        <div>
            <div className="flex flex-row space-x-6 py-4">
                <p className="items-center py-1 text-lg">Федеральный округ: </p>
                <Combobox
                    items={federalDistrictsItems} // Передаем список федеральных округов
                    selectedId={selectedFederalDistict || ""} // Текущее выбранное значение
                    onIdChange={(value) => {
                        if (selectedDistrict === "null") {
                            setSelecterFederalDistrict(value);
                            setSelectedDistrict("");
                        } else {
                            setSelecterFederalDistrict(value);
                        }
                    }} // Обработчик изменения
                    className="w-[24%]" // Класс для определения ширины объекта
                    disabled={isLoading ? true : false} // Элемент всегда включён
                />
                <p className="px-2 py-1 text-lg">Представительство: </p>
                <Combobox
                    items={representationItems} // Передаем список представительств
                    selectedId={selectedDistrict || ""} // Текущее выбранное значение
                    onIdChange={(value) => {
                        if (value === "null") {
                            setSelecterFederalDistrict("");
                            setSelectedDistrict(value); // Сбрасываем поле, если выбрано "Центральное"
                        } else {
                            setSelectedDistrict(value);
                        }
                    }} // Обработчик изменения
                    className="w-1/3" // Класс для определения ширины объекта
                    disabled={isLoading ? true : false} // Элемент всегда включён
                />
            </div>
            {isLoading && (
                <p className="flex items-center justify-center py-52 text-5xl font-black">
                    Календарь загружается, подождите...
                </p>
            )}
            {!isLoading && filteredEvents.length > 0 && (
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        initialDate={new Date()}
                        locale={ruLocale}
                        height={600}
                        editable={true}
                        selectable={true}
                        nextDayThreshold="00:00:00"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,dayGridWeek",
                        }}
                        events={filteredEvents}
                        eventClick={handleEventClick}
                        eventContent={(eventInfo) => <div>{eventInfo.event.title}</div>}
                        eventStartEditable={false}
                        eventDurationEditable={false}
                    />
                    {selectedEventData && (
                        <EventDialog
                            isOpen={isDialogOpen}
                            setIsOpen={setIsDialogOpen}
                            event={selectedEventData} // Передача полной информации о событии
                        />
                    )}
                </div>
            )}
            {!isLoading && filteredEvents.length <= 0 && (
                <p className="flex items-center justify-center py-52 text-center text-5xl font-black">
                    По вашим параметрам не нашлось ни одного события
                </p>
            )}
        </div>
    );
};

export default Calendar;
