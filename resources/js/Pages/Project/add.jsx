import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import MyHeader from "@/Components/Header";
import * as React from "react";
import { Input } from "@headlessui/react";
import { SearchIcon } from "lucide-react";
import {
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Grid,
    Chip,
    Card,
} from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import PrimaryButton from "@/Components/PrimaryButton";
import RichTextEditor from "@/Components/RichTextEditor";
import { Close } from "@mui/icons-material";

export default function AddProject({ auth }) {
    const [selectedTags, setSelectedTags] = React.useState([]);

    const handleChange = (event) => {
        setSelectedTags(event.target.value);
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Projets", href: "/projects" },
        { label: "Nouveau" },
    ];
    const tools = [
        "bold",
        "italic",
        "underline",
        "fontColor",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "link",
        "image",
        "undo",
        "redo",
        "source",
    ];

    const tagOptions = [
        "Marketing",
        "Development",
        "Design",
        "Sales",
        "HR",
        "Finance",
    ];

    const handleDeleteTag = (tagToDelete) => () => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.filter((tag) => tag !== tagToDelete)
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <MyHeader
                    title="Projets"
                    breadcrumbItems={breadcrumbItems}
                    right={
                        <div className="flex space-x-4">
                            <div className="flex items-center bg-gray-50 border rounded-md overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                                <Input
                                    className="p-2 bg-gray-50 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                                    placeholder="Rechercher un menu"
                                />
                                <SearchIcon size={20} />
                            </div>
                            <PrimaryButton
                                onClick={() => router.get("/projects/add")}
                            >
                                <GridAddIcon />
                                Nouveau Projet
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Ajouter un Projet" />

            <Card className="p-6 space-y-6 dark:text-gray-100 bg-white shadow-sm rounded-lg  dark:bg-gray-800" sx={{}} elevation={1}>
                {/* Content for adding a new project */}

                <Typography
                    variant="h5"
                    component="h2"
                    className="font-semibold mb-6"
                >
                    Ajouter un nouveau projet
                </Typography>
                <div className=" p-6 ">
                    {/* Form for adding a new project */}
                    <form className="space-y-6">
                        {/* Project name input */}
                        <div>
                            <InputLabel
                                htmlFor="ref"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Référence du projet
                            </InputLabel>
                            <TextField
                                type="text"
                                id="ref"
                                name="ref"
                                variant="outlined"
                                fullWidth
                                placeholder="PJ2409-0004"
                                InputProps={{
                                    className:
                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                }}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="Libelle"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Libellé
                            </InputLabel>
                            <TextField
                                type="text"
                                id="Libelle"
                                name="Libelle"
                                variant="outlined"
                                fullWidth
                                placeholder="Entrez le nom du projet"
                                InputProps={{
                                    className:
                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                }}
                            />
                        </div>
                        {/* Project usage options */}
                        <div>
                            <Typography
                                variant="subtitle1"
                                className="font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Usage
                            </Typography>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Suivre une opportunité"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Suivre des tâches ou du temps passé"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Facturer le temps passé"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Gestion d'organisation d'événements"
                                className="dark:text-gray-300"
                            />
                        </div>

                        {/* Visibility selection */}
                        <div>
                            <InputLabel
                                htmlFor="visibility"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Visibilité
                            </InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="visibility"
                                    name="visibility"
                                    variant="outlined"
                                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                    MenuProps={{
                                        classes: {
                                            paper: "dark:bg-gray-800 dark:text-gray-100",
                                        },
                                    }}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="private">Privé</MenuItem>
                                    <MenuItem value="assigned">
                                        Contacts assignés
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Opportunity status */}
                        <div>
                            <InputLabel
                                htmlFor="opportunityStatus"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Statut opportunité
                            </InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="opportunityStatus"
                                    name="opportunityStatus"
                                    variant="outlined"
                                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                    MenuProps={{
                                        classes: {
                                            paper: "dark:bg-gray-800 dark:text-gray-100",
                                        },
                                    }}
                                >
                                    <MenuItem value="open">Ouvert</MenuItem>
                                    <MenuItem value="inProgress">
                                        En cours
                                    </MenuItem>
                                    <MenuItem value="closedWon">Gagné</MenuItem>
                                    <MenuItem value="closedLost">
                                        Perdu
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Opportunity amount */}
                            <div>
                                <InputLabel
                                    htmlFor="opportunityAmount"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                >
                                    Montant opportunité (€)
                                </InputLabel>
                                <TextField
                                    type="number"
                                    id="opportunityAmount"
                                    name="opportunityAmount"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Entrez le montant de l'opportunité"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                />
                            </div>

                            {/* Budget */}
                            <div>
                                <InputLabel
                                    htmlFor="budget"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                >
                                    Budget (€)
                                </InputLabel>
                                <TextField
                                    type="number"
                                    id="budget"
                                    name="budget"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Entrez le budget"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Date range */}
                        <div>
                            <InputLabel
                                htmlFor="dateRange"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Date
                            </InputLabel>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                        className: "dark:text-gray-300",
                                    }}
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                />
                                <TextField
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                        className: "dark:text-gray-300",
                                    }}
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Project description input */}
                        <div>
                            <InputLabel
                                htmlFor="projectDescription"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Description du projet
                            </InputLabel>
                            <RichTextEditor activeTools={tools} />
                        </div>

                        {/* Tags/Categories */}
                        <div>
                            <InputLabel
                                htmlFor="tags"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Tags/catégories
                            </InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="tags"
                                    name="tags"
                                    multiple
                                    value={selectedTags}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <div className="flex flex-wrap gap-2 dark:text-gray-300">
                                            {selected.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    className="dark:bg-gray-800 dark:text-gray-100"
                                                    onDelete={(event) => {
                                                        handleDeleteTag(tag);
                                                        event.stopPropagation();
                                                    }}
                                                    deleteIcon={<Close />}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    variant="outlined"
                                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                    MenuProps={{
                                        classes: {
                                            paper: "dark:bg-gray-800 dark:text-gray-100",
                                        },
                                    }}
                                >
                                    {tagOptions.map((tag) => (
                                        <MenuItem key={tag} value={tag}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        {/* Submit button */}
                        <div>
                            <PrimaryButton className="py-2">
                                Créer le projet
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
