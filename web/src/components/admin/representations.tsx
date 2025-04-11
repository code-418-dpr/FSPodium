"use client";

import { useState } from "react";
import { RepresentationWithRegionAndUser } from "@/prisma/types";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { EditRepresentationDialog } from "../dialogs/edit-representation-dialog";

type RepresentationsProps = {
    representations: RepresentationWithRegionAndUser[];
};

export function Representations({ representations }: RepresentationsProps) {
    const [open, setOpen] = useState(false);
    const [editingRepresentation, setEditingRepresentation] =
        useState<RepresentationWithRegionAndUser | null>(null);

    const handleEdit = (representation: RepresentationWithRegionAndUser) => {
        setEditingRepresentation(representation);
        setOpen(true);
    };

    return (
        <div className="text-white">
            <h2 className="mb-4 text-2xl font-bold">Представительства</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Регион</TableHead>
                        <TableHead>Федеральный округ</TableHead>
                        <TableHead>Представитель</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Дата создания</TableHead>
                        <TableHead>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {representations.map((representation) => (
                        <TableRow key={representation.id}>
                            <TableCell>{representation.Region.name}</TableCell>
                            <TableCell>{representation.Region.FederalDistrict.name}</TableCell>
                            <TableCell>{representation.User.name}</TableCell>
                            <TableCell>{representation.User.email}</TableCell>
                            <TableCell>
                                {new Date(representation.createdAt).toLocaleDateString("ru-RU")}
                            </TableCell>
                            <TableCell>
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600"
                                    variant="outline"
                                    onClick={() => handleEdit(representation)}
                                >
                                    Редактировать
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditRepresentationDialog
                key={editingRepresentation?.id}
                open={open}
                onOpenChange={setOpen}
                representation={editingRepresentation}
            />
        </div>
    );
}
