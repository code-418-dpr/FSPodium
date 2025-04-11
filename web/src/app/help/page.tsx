import Link from "next/link";
import { ClockIcon, FileTextIcon, Mail, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
    const documents = [
        {
            title: "Правила вида спорта",
            href: "/documents/rules.pdf",
        },
        {
            title: "Изменения в правилах",
            href: "/documents/rules-changes.pdf",
        },
        {
            title: "Документы для участия в соревнованиях",
            href: "/documents/docs.pdf",
        },
    ];

    return (
        <div className="p-6 md:p-8 lg:p-12">
            <div className="mx-auto max-w-5xl space-y-8">
                <h1 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
                    Справочная информация
                </h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-primary/20 bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <PhoneIcon className="h-5 w-5" />
                                Контакты поддержки
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email:</p>
                                    <a
                                        href="mailto:support@federation.ru"
                                        className="hover:text-primary hover:underline"
                                    >
                                        support@federation.ru
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <PhoneIcon className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Телефон:</p>
                                    <a
                                        href="tel:+79991234567"
                                        className="hover:text-primary hover:underline"
                                    >
                                        +7 (999) 123-45-67
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ClockIcon className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Время работы:</p>
                                    <p>Пн-Пт, 9:00 - 18:00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-primary/20 bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <FileTextIcon className="h-5 w-5" />
                                Основные документы
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {documents.map((doc) => (
                                <Button
                                    asChild
                                    key={doc.href}
                                    variant="outline"
                                    className="h-auto w-full justify-start gap-2 px-3 py-2 hover:bg-primary/10"
                                >
                                    <Link href={doc.href} className="flex items-center gap-2">
                                        <FileTextIcon className="h-4 w-4" />
                                        {doc.title}
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
