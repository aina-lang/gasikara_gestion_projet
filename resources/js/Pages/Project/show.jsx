import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import MyHeader from "@/Components/Header";
import React, { useState } from "react";
import { GridAddIcon } from "@mui/x-data-grid";
import PrimaryButton from "@/Components/PrimaryButton";

export default function show({ auth }) {
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
                            {/* <div className="flex items-center bg-gray-50 border rounded-md overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                                <Input
                                    className="p-2 bg-gray-50 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                                    placeholder="Rechercher un projet"
                                />
                                <SearchIcon size={20} />
                            </div PJ2409-0004> */}
                            <PrimaryButton
                                onClick={() => router.get("/projects/add")}
                            >
                                <GridAddIcon />
                                Nouveau categorie
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Ajouter un Projet" />

        </AuthenticatedLayout>
    );
}
