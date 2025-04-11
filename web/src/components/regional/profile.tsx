import { useState } from "react";
import { updateUser } from "@/data/user";
import { RepresentationWithRegionAndUser } from "@/prisma/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormFeedback } from "../shared/form-feedback";

type Props = {
    representation: RepresentationWithRegionAndUser;
};

export function Profile({ representation }: Props) {
    const [isEditable, setIsEditable] = useState(false);
    const [userData, setUserData] = useState(representation.User);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleEditClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsEditable(true);
    };

    const handleSaveClick = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(userData.id, userData.name || "", userData.email || "");
            setSuccess("Информация о пользователе успешно обновлена");
            setError(null);
        } catch (error) {
            setError("Не удалось обновить информацию о пользователе");
            setUserData(representation.User);
            setSuccess(null);
        }
        setIsEditable(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Профиль регионального представителя</h2>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-8" onSubmit={handleSaveClick}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="district">Федеральный округ</Label>
                            {isEditable ? (
                                <Input
                                    id="district"
                                    className="text-lg"
                                    value={representation.Region?.FederalDistrict?.name || ""}
                                    disabled
                                />
                            ) : (
                                <p className="text-lg">
                                    {representation.Region?.FederalDistrict?.name}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="representation-name">
                                Название субъекта представительства
                            </Label>
                            {isEditable ? (
                                <Input
                                    id="representation-name"
                                    className="text-lg"
                                    value={representation.Region?.name || ""}
                                    disabled
                                />
                            ) : (
                                <p className="text-lg">{representation.Region?.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">ФИО</Label>
                            {isEditable ? (
                                <Input
                                    id="name"
                                    className="text-lg"
                                    value={userData.name || ""}
                                    onChange={(e) =>
                                        setUserData({ ...userData, name: e.target.value })
                                    }
                                />
                            ) : (
                                <p className="text-lg">{userData.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            {isEditable ? (
                                <Input
                                    id="email"
                                    type="email"
                                    className="text-lg"
                                    value={userData.email || ""}
                                    onChange={(e) =>
                                        setUserData({ ...userData, email: e.target.value })
                                    }
                                />
                            ) : (
                                <p className="text-lg">{userData.email}</p>
                            )}
                        </div>
                        {error && <FormFeedback errorMessage={error} />}
                        {success && <FormFeedback successMessage={success} />}
                        <div>
                            {isEditable ? (
                                <Button type="submit">Сохранить изменения</Button>
                            ) : (
                                <Button type="button" onClick={handleEditClick}>
                                    Редактировать
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
