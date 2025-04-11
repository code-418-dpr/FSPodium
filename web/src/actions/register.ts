"use server";

import { createRepresentation } from "@/data/representation";
import { applyRepresentationRequest } from "@/data/representationRequest";
import { createUser } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/db";

export const registerRequest = async (
    values: z.infer<typeof RegisterSchema>
): Promise<{ error: string } | null> => {
    const { name, email, region } = values;

    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Пользователь с таким email уже существует!" };
    }

    const existingRepresentation = await db.representation.findFirst({
        where: { regionId: region },
    });

    if (existingRepresentation) {
        return { error: "Представительство этого региона уже существует!" };
    }

    const result = await applyRepresentationRequest(region, name, email);
    if (!result) {
        return { error: "Произошла ошибка при отправке заявки!" };
    }

    return null;
};

export const registerUser = async (requestId: string, password: string) => {
    const representationRequest = await db.representationRequest.findUnique({
        where: { id: requestId },
    });

    if (!representationRequest) {
        return { error: "Заявка не найдена!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
        representationRequest.email,
        hashedPassword,
        representationRequest.name
    );

    await createRepresentation(representationRequest.regionId, user.id);

    return { user };
};
