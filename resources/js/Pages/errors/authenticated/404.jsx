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

export default function Dashboard({ auth }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Projets" },
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
                                    className="p-2 bg-gray-50 border-none"
                                    placeholder="Rechercher un menu"
                                />
                                <SearchIcon className="text-gray-500" size={20} />
                            </div>
                            <PrimaryButton
                                onClick={() => router.get("/projects/add")}
                            >
                                <GridAddIcon />
                                Opportunité / Projet
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Projets" />

            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-6xl font-bold text-red-500 dark:text-red-400 mb-4">404</h1>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Oups ! La page que vous cherchez n'existe pas.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Il semble que vous ayez suivi un lien invalide ou que la page ait été déplacée.
                    </p>
                    <PrimaryButton
                        onClick={() => router.get("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Retour à l'accueil
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
