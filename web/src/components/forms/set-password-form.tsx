"use client";

import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { registerUser } from "@/actions/register";
import { SetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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

export const SetPasswordForm = ({ requestId }: { requestId: string }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SetPasswordSchema>>({
        resolver: zodResolver(SetPasswordSchema),
        defaultValues: {
            password: "",
            repeatPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof SetPasswordSchema>) => {
        setError("");
        setSuccess("");

        if (!values.password) {
            throw new Error("Not expected");
        }

        const result = await registerUser(requestId, values.password);

        if (result?.user && result.user.email) {
            setSuccess("Пароль установлен успешно!");
            await login({ email: result.user.email, password: values.password });
        } else {
            setError(result?.error || "Что-то пошло не так!");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Повторите пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormFeedback errorMessage={error} successMessage={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Установить пароль
                </Button>
            </form>
        </Form>
    );
};
