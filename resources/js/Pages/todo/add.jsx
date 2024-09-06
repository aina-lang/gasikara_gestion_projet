import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import MyHeader from "@/Components/Header";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@headlessui/react";
import { SearchIcon } from "lucide-react";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (value, row) =>
            `${row.firstName || ""} ${row.lastName || ""}`,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Dashboard({ auth }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Projets", href: "/projects" },
        { label: "Nouveau" },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <MyHeader
                    title="Projets"
                    breadcrumbItems={breadcrumbItems}
                    right={
                        <div className="flex space-x-4">
                            <div className="flex items-center bg-gray-50 pr-2 border rounded-md overflow-hidden">
                                <Input
                                    className={`p-2 bg-gray-50`}
                                    placeholder="rechercher un menu"
                                />
                                <SearchIcon className="" size={20} />
                            </div>
                            <PrimaryButton
                                className=""
                                onClick={() => router.get("/projects/add")}
                            >
                                <GridAddIcon />
                                nouvelle opportunité / projet
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Projets" />

            <div className="mx-auto p-6 pt-0 space-y-5 "></div>
        </AuthenticatedLayout>
    );
}
