import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import MyHeader from "@/Components/Header";
import React, { useMemo, useState } from "react";
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
import InputError from "@/Components/InputError";

export default function AddProject({ auth, leadStatus, categories }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [followTasksChecked, setFollowTasksChecked] = useState(false);
    const [billTimeChecked, setBillTimeChecked] = useState(false);
    const [trackTasks, setTrackTasks] = useState(true);
    const [billTime, setBillTime] = useState(false);
    const [trackOpportunity, setTrackOpportunity] = useState(false);
    const [manageEvent, setManageEvent] = useState(false);

    // console.log(auth);
    const handleManageEventChange = (event) => {
        setData("manage_event", event.target.checked);
        setManageEvent(event.target.checked);
    };

    const handleTrackOpportunityChange = (event) => {
        setData("track_opportunity", event.target.checked);
        setTrackOpportunity(event.target.checked);
    };

    const handleTrackTasksChange = (event) => {
        const checked = event.target.checked;
        setData("track_tasks", checked);
        setTrackTasks(checked);
        if (!checked) {
            setBillTime(false);
        }
    };

    const handleBillTimeChange = (event) => {
        const checked = event.target.checked;
        setData("bill_time", checked);
        setBillTime(checked);
        if (checked) {
            setTrackTasks(true);
        }
    };

    const handleDescriptionChange = (newDescription) => {
        setData({
            ...data,
            description: newDescription,
        });
    };

    const { data, setData, post, errors } = useForm({
        ref: "",
        title: "",
        description: "",
        dateo: "",
        datee: "",
        public: 1,
        fk_user_creat: auth?.user?.rowid,
        opp_amount: "",
        opp_percent: "",
        budget_amount: "",
        usage_opportunity: 0,
        usage_task: 0,
        usage_bill_time: 0,
        usage_organize_event: 0,
        date_start_event: "",
        date_end_event: "",
        location: "",
        accept_conference_suggestions: 0,
        accept_booth_suggestions: 0,
        max_attendees: "",
        price_registration: "",
        price_booth: "",
        model_pdf: "",
        entity: auth?.user?.entity,
        ip: "",
        last_main_doc: "",
        import_key: "",
        extraparams: "",
        categories: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/projects/add", data, {
            onSuccess: () => {
                console.log("yes");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
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

    for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
            const element = errors[key];
            console.log(element);
        }
    }

    // Utilisation d'un useMemo pour créer une structure hiérarchique des catégories
    const categoryTree = useMemo(() => {
        const categoryMap = new Map();
        const rootCategories = [];

        categories.forEach((cat) => {
            categoryMap.set(cat.rowid, { ...cat, subcategories: [] });
        });

        categories.forEach((cat) => {
            if (cat.fk_parent === 0) {
                rootCategories.push(categoryMap.get(cat.rowid));
            } else {
                const parentCategory = categoryMap.get(cat.fk_parent);
                if (parentCategory) {
                    parentCategory.subcategories.push(
                        categoryMap.get(cat.rowid)
                    );
                }
            }
        });

        return rootCategories;
    }, [categories]);

    const findCategoryById = (id) => {
        return categories.find((cat) => cat.rowid === id);
    };

    const getCategoryPath = (id) => {
        const path = [];
        let current = findCategoryById(id);
        while (current) {
            path.unshift(current.label);
            current = findCategoryById(current.fk_parent);
        }
        return path.join(" > ");
    };

    const handleTagChange = (event) => {
        const selectedCategoryId = event.target.value;
        setData("categories", selectedCategoryId);
    };

    const handleDeleteTag = (tagToDelete) => {
        setData(
            "categories",
            data.categories.filter((id) => id !== tagToDelete)
        );
    };

    const renderCategoryOptions = (categories, parentPath = "") => {
        return categories.flatMap((category) => {
            // Build the full path for the current category
            const fullPath = parentPath
                ? `${parentPath} > ${category.label}`
                : category.label;

            // Return the current category option and recursively render its subcategories
            return [
                <MenuItem key={category.rowid} value={category.rowid}>
                    {fullPath}
                </MenuItem>,
                renderCategoryOptions(category.subcategories, fullPath),
            ];
        });
    };

    const formatDateTime = (date, time) => {
        return `${date} ${time}`;
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
                        <input type="hidden" name="fk_user_creat" />
                        <input type="hidden" name="entity" />
                        <div>
                            <InputLabel
                                htmlFor="ref"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                required
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
                                onChange={(e) => setData("ref", e.target.value)}
                                required
                            />
                            <InputError message={errors.ref} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                required
                            >
                                Libellé
                            </InputLabel>
                            <TextField
                                type="text"
                                id="title"
                                name="title"
                                variant="outlined"
                                fullWidth
                                placeholder="Entrez le nom du projet"
                                InputProps={{
                                    className:
                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                }}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                error={!!errors.title}
                                helperText={errors.title}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="subtitle1"
                                className="font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Usage
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={trackOpportunity}
                                        onChange={handleTrackOpportunityChange}
                                        name="usage_opportunity"
                                    />
                                }
                                label="Suivre une opportunité"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={trackTasks}
                                        onChange={handleTrackTasksChange}
                                        name="usage_task"
                                    />
                                }
                                label="Suivre des tâches ou du temps passé"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={billTime}
                                        onChange={handleBillTimeChange}
                                        name="usage_bill_time"
                                    />
                                }
                                label="Facturer le temps passé"
                                className="dark:text-gray-300"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={manageEvent}
                                        onChange={handleManageEventChange}
                                        name="usage_organize_event"
                                    />
                                }
                                label="Gestion d'organisation d'événements"
                                className="dark:text-gray-300"
                            />
                            <InputError
                                message={errors.usage}
                                className="mt-2"
                            />
                        </div>

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
                                    name="public"
                                    variant="outlined"
                                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                    defaultValue="public"
                                    MenuProps={{
                                        classes: {
                                            paper: "dark:bg-gray-800 dark:text-gray-100",
                                        },
                                    }}
                                >
                                    <MenuItem
                                        value="private"
                                        onClick={() => setData("public", 0)}
                                    >
                                        Cantacts assignés
                                    </MenuItem>
                                    <MenuItem
                                        value="public"
                                        onClick={() => setData("public", 1)}
                                    >
                                        Tout le monde
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <InputError
                                message={errors.visibility}
                                className="mt-2"
                            />
                        </div>

                        {trackOpportunity && (
                            <div className="grid grid-cols-2 gap-4">
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
                                            name="fk_opp_status"
                                            variant="outlined"
                                            className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                            MenuProps={{
                                                classes: {
                                                    paper: "dark:bg-gray-800 dark:text-gray-100",
                                                },
                                            }}
                                            defaultValue={leadStatus[0].rowid}
                                            onChange={(e) =>
                                                setData(
                                                    "fk_opp_status",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value={"Aucun"}>
                                                Aucun
                                            </MenuItem>
                                            {leadStatus.map((status) => (
                                                <MenuItem
                                                    key={status.rowid}
                                                    value={status.rowid}
                                                    onClick={(e) =>
                                                        setData(
                                                            "fk_opp_status",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <InputError
                                        message={errors.opportunityStatus}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="opp_percent"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    >
                                        Probabilité opportunité (%)
                                    </InputLabel>
                                    <div className="bg-gray-100 dark:bg-gray-900 flex items-center space-x-2 relative">
                                        <TextField
                                            type="number"
                                            id="opp_percent"
                                            name="opp_percent"
                                            variant="outlined"
                                            value={data.opp_percent}
                                            fullWidth
                                            placeholder="Probabilité de l'opportunité"
                                            InputProps={{
                                                className:
                                                    " dark:text-gray-100 dark:placeholder-gray-400",
                                            }}
                                            onChange={(e) =>
                                                setData(
                                                    "opp_percent",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            className="font-semibold mb-6 dark:text-gray-100 absolute right-11"
                                        >
                                            %
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
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
                                    name="opp_amount"
                                    variant="outlined"
                                    value={data.opp_amount}
                                    fullWidth
                                    placeholder="Entrez le montant de l'opportunité"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                    onChange={(e) =>
                                        setData("opp_amount", e.target.value)
                                    }
                                />
                            </div>

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
                                    name="budget_amount"
                                    variant="outlined"
                                    value={data.budget_amount}
                                    fullWidth
                                    placeholder="Entrez le budget"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                    onChange={(e) =>
                                        setData("budget_amount", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    {" "}
                                    <InputLabel
                                        htmlFor="startDate"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    >
                                        Date début
                                    </InputLabel>
                                    <TextField
                                        type="date"
                                        id="startDate"
                                        name="dateo"
                                        variant="outlined"
                                        value={data.dateo}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                            className: "dark:text-gray-300",
                                        }}
                                        InputProps={{
                                            className:
                                                "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                        }}
                                        onChange={(e) =>
                                            setData("dateo", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="endDate"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    >
                                        Date de clôture
                                    </InputLabel>
                                    <TextField
                                        type="date"
                                        id="endDate"
                                        name="datee"
                                        variant="outlined"
                                        value={data.datee}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                            className: "dark:text-gray-300",
                                        }}
                                        InputProps={{
                                            className:
                                                "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                        }}
                                        onChange={(e) =>
                                            setData("datee", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <InputError
                                message={errors.date}
                                className="mt-2"
                            />
                        </div>
                        {manageEvent && (
                            <>
                                <div className="grid grid-cols-2 gap-4 grow">
                                    <div className="w-full">
                                        {" "}
                                        <InputLabel
                                            htmlFor="eventDateRange"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                        >
                                            Date début (Événement)
                                        </InputLabel>
                                        <TextField
                                            type="datetime-local"
                                            variant="outlined"
                                            className="mr-2 w-full"
                                            value={data.date_start_event}
                                            onChange={(e) =>
                                                setData(
                                                    "date_start_event",
                                                    e.target.value
                                                )
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                                className: "dark:text-gray-300",
                                            }}
                                            InputProps={{
                                                className:
                                                    "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                            }}
                                            error={!!errors.date_start_event}
                                            helperText={errors.date_start_event}
                                        />
                                    </div>

                                    <div className="w-full">
                                        {" "}
                                        <InputLabel
                                            htmlFor="eventDateRange"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                        >
                                            Date cloture (Événement)
                                        </InputLabel>
                                        <TextField
                                            type="datetime-local"
                                            variant="outlined"
                                            className="ml-2 w-full"
                                            value={data.date_end_event}
                                            onChange={(e) =>
                                                setData(
                                                    "date_end_event",
                                                    e.target.value
                                                )
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                                className: "dark:text-gray-300",
                                            }}
                                            InputProps={{
                                                className:
                                                    "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                            }}
                                            error={!!errors.date_end_event}
                                            helperText={errors.date_end_event}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="location"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                        required
                                    >
                                        Lieu d'événement
                                    </InputLabel>
                                    <TextField
                                        type="text"
                                        id="location"
                                        name="location"
                                        variant="outlined"
                                        fullWidth
                                        placeholder=""
                                        InputProps={{
                                            className:
                                                "bg-gray-100 dark:bg-gray-900 dark:text-gray-100  dark:placeholder-gray-400",
                                        }}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.location}
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        )}

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

                        <div>
                            <InputLabel
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                            >
                                Description du projet
                            </InputLabel>
                            <RichTextEditor
                                initialContent={"Descripton du projet"} // Contenu initial de l'éditeur
                                onContentChange={handleDescriptionChange} // Gérer les changements de contenu
                                className="dark:bg-gray-900 dark:text-gray-100"
                            />
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
