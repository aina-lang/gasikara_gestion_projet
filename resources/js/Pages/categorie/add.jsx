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

import { useForm } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },

        { label: "categories", href: "/categories" },
        { label: "Nouveau" },
    ];
    const { data, setData, post, processing, errors } = useForm({
        reference: "",
        description: "",
        parent_id: null,
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/categories");
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <MyHeader

                    title="categories"
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

                                onClick={() => router.get("/categories/add")}
                            >
                                <GridAddIcon />

                                nouvelle categorie
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >

            <Head title="categories" />


            <div className="mx-auto p-6 pt-0 space-y-5 ">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="reference"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Reference
                            </label>
                            <input
                                type="text"
                                name="reference"
                                id="reference"
                                value={data.reference}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                value={data.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                    >
                        Enregistrer
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
