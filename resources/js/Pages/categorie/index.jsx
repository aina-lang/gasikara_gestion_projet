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

export default function Dashboard({ auth, categories }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Projets" },
    ];

    console.log(categories);
    const rows = categories.map((category) => ({
        id: category.id,
        label: category.label,
        description: category.description,
        // color: category.color,
        tms: category.tms,
    }));

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "label",
            headerName: "Label",
            width: 150,
            editable: false,
        },
        {
            field: "description",
            headerName: "Description",
            width: 250,
            editable: false,
            renderCell: (params) => (
                <div
                    dangerouslySetInnerHTML={{ __html: params.value }}
                    // Additional styling can be added here
                />
            ),
        },
        // {
        //     field: "color",
        //     headerName: "Color",
        //     width: 120,
        //     editable: false,
        // },
        {
            field: "tms",
            headerName: "Last Modified",
            width: 180,
            editable: false,
        },
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

            <div className="mx-auto p-6 pt-0 space-y-5 ">
                <Box sx={{ height: 400, width: "100%" }} className="bg-white">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        RowSelectionOnClick
                    />
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}
