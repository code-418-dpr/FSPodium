"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ResultEvents } from "@prisma/client";
import { ArrowLeftIcon, TriangleAlertIcon } from "lucide-react";

import { getFile, getFileBlob } from "@/lib/files";
import { sendFileToParser } from "@/lib/parser";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TeamsDisplay } from "@/components/shared/teams-display";

export function ResultViewer({ resultFile }: { resultFile: ResultEvents | null }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            if (!resultFile) {
                setError("Файл не найден");
                setLoading(false);
                return;
            }
            const blob = await getFileBlob(resultFile.filePath);
            try {
                const formData = new FormData();
                formData.append("file", blob, resultFile.fileName);
                const data = await sendFileToParser(formData);
                const result = JSON.parse(data);
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setError("Ошибка при загрузке файла");
                setLoading(false);
            }
        };
        fetchResult();
    }, [resultFile]);

    return (
        <div className="relative w-full flex-1">
            <div className="flex flex-col items-center justify-center">
                {loading ? (
                    <p className="mt-52 text-3xl text-gray-300">Загрузка...</p>
                ) : error ? (
                    <div className="mt-52 flex items-center gap-x-2 rounded-md border border-destructive/60 bg-red-600/10 p-3">
                        <TriangleAlertIcon className="h-6 w-6 text-2xl text-red-700" />
                        <p className="text-2xl text-red-700">{error}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Link
                            href="/regional"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "absolute left-4 top-0"
                            )}
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Вернуться назад
                        </Link>
                        <h1 className="mb-6 text-center text-3xl font-bold text-gray-100">
                            Результаты обработки файла {resultFile?.fileName}
                        </h1>
                        {data ? <TeamsDisplay teams={data} /> : <p>Loading...</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
