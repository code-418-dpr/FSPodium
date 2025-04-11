"use client";

import { useState } from "react";
import { registerRequest } from "@/actions/register";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFeedback } from "@/components/shared/form-feedback";

export const RegisterForm = ({ regions }: { regions: { id: string; name: string }[] }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            region: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        setIsPending(true);
        registerRequest(values).then((data) => {
            if (data?.error) {
                setError(data.error);
                form.reset();
                setIsPending(false);
            } else {
                setSuccess(
                    "Заявка отправлена! После одобрения вам придет письмо на указанную почту."
                );
                form.reset();
                setIsPending(false);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ФИО</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Иванов Иван Иванович"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="ivanov@mail.ru"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Регион</FormLabel>
                                <FormControl>
                                    <Combobox
                                        items={regions}
                                        selectedId={field.value}
                                        onIdChange={field.onChange}
                                        className="w-full"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormFeedback errorMessage={error} successMessage={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Подать заявку
                </Button>
            </form>
        </Form>
    );
};
