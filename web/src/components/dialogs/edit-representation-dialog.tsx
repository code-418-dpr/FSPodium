import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/data/user";
import { RepresentationWithRegionAndUser } from "@/prisma/types";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    representation: RepresentationWithRegionAndUser | null;
};

export function EditRepresentationDialog({ open, onOpenChange, representation }: Props) {
    const [editingRepresentation, setEditingRepresentation] = useState(representation);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await updateUser(
            editingRepresentation!.User.id,
            editingRepresentation!.User.name || "",
            editingRepresentation!.User.email || ""
        );

        onOpenChange(false);
        router.refresh();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="text-white" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Редактировать представительство</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="region">Регион</Label>
                        <Input
                            id="region"
                            name="Region.name"
                            defaultValue={editingRepresentation?.Region.name || ""}
                            disabled={true}
                            className="bg-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="district">Федеральный округ</Label>
                        <Input
                            id="district"
                            name="Region.FederalDistrict.name"
                            defaultValue={editingRepresentation?.Region.FederalDistrict.name || ""}
                            disabled={true}
                            className="bg-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name">Имя представителя</Label>
                        <Input
                            id="name"
                            name="User.name"
                            value={editingRepresentation?.User.name || ""}
                            onChange={(event) =>
                                setEditingRepresentation({
                                    ...editingRepresentation!,
                                    User: {
                                        ...editingRepresentation!.User,
                                        name: event.target.value,
                                    },
                                })
                            }
                            className="bg-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="User.email"
                            value={editingRepresentation?.User.email || ""}
                            onChange={(event) =>
                                setEditingRepresentation({
                                    ...editingRepresentation!,
                                    User: {
                                        ...editingRepresentation!.User,
                                        email: event.target.value,
                                    },
                                })
                            }
                            className="bg-gray-900"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Отменить
                        </Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
