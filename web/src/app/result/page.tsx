import { getResultEventById } from "@/data/resultEvent";

import { ResultViewer } from "@/components/shared/result-viewer";

export default async function ResultPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const id = (await searchParams).id as string;
    const resultEvent = await getResultEventById(id);
    return <ResultViewer resultFile={resultEvent} />;
}
