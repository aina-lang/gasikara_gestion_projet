import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Card,
    Chip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState, useEffect, useMemo } from "react";

export default function AddProject({ auth, categories }) {
    const { data, setData, post, errors } = useForm({
        categories: [],
    });

   

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ajouter un Projet" />

            <Card
                className="p-6 space-y-6 bg-white shadow-sm rounded-lg dark:bg-gray-800"
                elevation={1}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    className="font-semibold mb-6 dark:text-gray-100"
                >
                    Ajouter un nouveau projet
                </Typography>

                <div className="p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <InputLabel
                                htmlFor="categories"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Catégories
                            </InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="categories"
                                    multiple
                                    value={data.categories}
                                    onChange={handleTagChange}
                                    renderValue={(selected) => (
                                        <div className="flex flex-wrap gap-2">
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={getCategoryPath(
                                                        value
                                                    )}
                                                    onDelete={() =>
                                                        handleDeleteTag(value)
                                                    }
                                                    deleteIcon={<Close />}
                                                    className="bg-gray-200 dark:bg-gray-700"
                                                />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {renderCategoryOptions(categoryTree)}
                                </Select>
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Ajouter le projet
                        </Button>
                    </form>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
