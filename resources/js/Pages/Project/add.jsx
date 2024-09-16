import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import MyHeader from "@/Components/Header";
import React, { useState } from "react";
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

    const handleTagChange = (event) => {
        setSelectedTags(event.target.value);
    };

    const handleDeleteTag = (tagToDelete) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.filter((tag) => tag !== tagToDelete)
        );
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

    const { data, setData, post, errors } = useForm({
        ref: "",
        title: "",
        description: "",
        dateo: "",
        datee: "",
        public: 1,
        fk_user_creat: auth?.user?.rowid,
        opp_amount: "",
        budget_amount: "",
        usage_opportunity: false,
        usage_task: false,
        usage_bill_time: false,
        usage_organize_event: false,
        date_start_event: "",
        date_end_event: "",
        location: "",
        accept_conference_suggestions: false,
        accept_booth_suggestions: false,
        max_attendees: "",
        price_registration: "",
        price_booth: "",
        model_pdf: "",
        entity: auth?.user?.entity,
        ip: "",
        last_main_doc: "",
        import_key: "",
        extraparams: "",
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
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
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
                                    {/* <MenuItem value="assigned">
                                        Contacts assignés
                                    </MenuItem> */}
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
                                        >
                                            <MenuItem
                                                // key={status.rowid}
                                                value={"Aucun"}
                                            >
                                                Aucun
                                            </MenuItem>
                                            {leadStatus.map((status) => (
                                                <MenuItem
                                                    key={status.rowid}
                                                    value={status.rowid}
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
                                        htmlFor="opportunityAmount"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    >
                                        Probabilité opportunité (%)
                                    </InputLabel>
                                    <div className="bg-gray-100 dark:bg-gray-900 flex items-center space-x-2 relative">
                                        <TextField
                                            type="number"
                                            id="opportunityAmount"
                                            name="opp_amount"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Entrez le montant de l'opportunité"
                                            InputProps={{
                                                className:
                                                    " dark:text-gray-100 dark:placeholder-gray-400",
                                            }}
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
                                    fullWidth
                                    placeholder="Entrez le montant de l'opportunité"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
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
                                    fullWidth
                                    placeholder="Entrez le budget"
                                    InputProps={{
                                        className:
                                            "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                    }}
                                />
                            </div>
                            <InputError
                                message={errors.budget}
                                className="mt-2"
                            />
                        </div>

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
                                    name="dateo"
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
                                    name="datee"
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
                            <InputError
                                message={errors.date}
                                className="mt-2"
                            />
                        </div>
                        {manageEvent && (
                            <>
                                <div className="date-selection">
                                    <InputLabel
                                        htmlFor="eventDateRange"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    >
                                        Date (Événement)
                                    </InputLabel>
                                    <div className="flex items-center justify-between">
                                        <div className="grid grid-cols-2 gap-4 grow">
                                            <TextField
                                                type="date"
                                                variant="outlined"
                                                className="mr-2"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    className:
                                                        "dark:text-gray-300",
                                                }}
                                                InputProps={{
                                                    className:
                                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                                }}
                                            />
                                            <TextField
                                                type="time"
                                                variant="outlined"
                                                className="mr-2"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    className:
                                                        "dark:text-gray-300",
                                                }}
                                                InputProps={{
                                                    className:
                                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                                }}
                                            />
                                        </div>
                                        <span className="p-2">au</span>
                                        <div className="grid grid-cols-2 gap-4 grow">
                                            <TextField
                                                type="date"
                                                variant="outlined"
                                                className="ml-2"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    className:
                                                        "dark:text-gray-300",
                                                }}
                                                InputProps={{
                                                    className:
                                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-400",
                                                }}
                                            />
                                            <TextField
                                                type="time"
                                                variant="outlined"
                                                className="ml-2 text-center"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    className:
                                                        "dark:text-gray-300",
                                                }}
                                                InputProps={{
                                                    className:
                                                        "bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.date}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="ref"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                                        required
                                    >
                                        Lieu d'événement
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
                                                "bg-gray-100 dark:bg-gray-900 dark:text-gray-100  dark:placeholder-gray-400",
                                        }}
                                        onChange={(e) =>
                                            setData("ref", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.ref}
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
                                    value={selectedTags}
                                    onChange={handleTagChange}
                                    renderValue={(selected) => (
                                        <div className="flex flex-wrap gap-2">
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        categories.find(
                                                            (cat) =>
                                                                cat.rowid ===
                                                                value
                                                        )?.label
                                                    }
                                                    onDelete={() =>
                                                        handleDeleteTag(value)
                                                    }
                                                    deleteIcon={<Close />}
                                                    className="bg-gray-200 dark:bg-gray-700 "
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={{
                                        classes: {
                                            paper: "bg-gray-100 dark:bg-gray-900 dark:text-gray-100",
                                        },
                                    }}
                                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category.rowid}
                                            value={category.rowid}
                                        >
                                            {category.label}
                                        </MenuItem>
                                    ))}
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
                                id="description"
                                name="description"
                                tools={tools}
                                value=""
                                placeholder="Entrez la description du projet"
                                contentEditable="true"
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
