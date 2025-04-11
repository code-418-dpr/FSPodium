import { useEffect, useState } from "react";
import { ResultEvents } from "@prisma/client";

import { getFile } from "@/lib/files";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function PdfDialog({ file }: { file: ResultEvents }) {
    const [base64String, setBase64String] = useState<string>("");

    useEffect(() => {
        async function fetchPdf() {
            try {
                const base64 = await getFile(file.filePath);
                setBase64String(base64);
            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        }
        fetchPdf();
    }, [file.filePath]);

    return (
        <Dialog>
            <DialogTrigger>
                <div className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-white px-3 py-1 text-black">
                    Просмотр PDF
                </div>
            </DialogTrigger>
            <DialogContent className="flex h-[90vh] max-h-none w-[90vw] max-w-none flex-col">
                <DialogHeader>
                    <DialogTitle>Просмотр PDF</DialogTitle>
                </DialogHeader>
                <div className="w-full flex-1">
                    <object
                        data={`data:application/pdf;base64,${base64String}`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    >
                        <p>
                            Не удалось отобразить PDF файл.{" "}
                            <a
                                className="text-blue-600 hover:text-blue-800"
                                href={`data:application/pdf;base64,${base64String}`}
                            >
                                Скачать
                            </a>{" "}
                        </p>
                    </object>
                </div>
            </DialogContent>
        </Dialog>
    );
}
