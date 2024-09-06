import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Pagination,
} from "@mui/material";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@headlessui/react";
import { GridIcon, SearchIcon } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import MyHeader from "@/Components/Header";
import {
    Assessment,
    AttachMoney,
    CalendarToday,
    Person,
    TableView,
    Visibility,
} from "@mui/icons-material";
import { format } from "date-fns";

// Définir les statuts de projet avec leurs couleurs
const projectStatuses = [
    { label: "En cours", value: "in_progress", color: "blue" },
    { label: "En attente", value: "on_hold", color: "orange" },
    { label: "Terminé", value: "completed", color: "green" },
    { label: "Annulé", value: "canceled", color: "red" },
];

// Mock data pour les projets
const generateProjects = (num) => {
    const projects = [];
    const startDate = new Date("2023-10-26");
    const endDate = new Date("2023-11-30");
    const visibilityOptions = ["Public", "Private", "Assigned"];
    const statuses = ["not_started", "in_progress", "completed", "closed"];

    for (let i = 1; i <= num; i++) {
        // Générer des dates aléatoires entre startDate et endDate
        const randomStartDate = new Date(
            startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
        );
        const randomEndDate = new Date(
            randomStartDate.getTime() +
                Math.random() * (endDate.getTime() - randomStartDate.getTime())
        );

        projects.push({
            id: i,
            reference: `DOL-${String(i).padStart(3, "0")}`,
            label: `Project ${i}`,
            startDate: randomStartDate.toISOString().split("T")[0],
            endDate: randomEndDate.toISOString().split("T")[0],
            visibility:
                visibilityOptions[
                    Math.floor(Math.random() * visibilityOptions.length)
                ],
            assignedTo: `User ${Math.floor(Math.random() * 10) + 1}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            opportunityAmount: Math.floor(Math.random() * 10000) + 1000,
            opportunityProbability: Math.random(),
            state: Math.random() > 0.5 ? "active" : "inactive",
        });
    }

    return projects;
};

const projects = generateProjects(100);

// Fonction pour obtenir le label du statut à partir de sa valeur
const getStatusLabel = (statusValue) => {
    const status = projectStatuses.find(
        (status) => status.value === statusValue
    );
    return status ? status.label : statusValue;
};

export default function Projects({ auth }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [gridView, setGridView] = useState(false); // État pour basculer entre la vue en grille et la vue en tableau
    const [currentPage, setCurrentPage] = useState(1); // État pour la pagination
    const itemsPerPage = 12;
    // Filtrer les projets en fonction de la recherche
    const filteredProjects = projects.filter((project) => {
        const searchableText =
            `${project.reference} ${project.label} ${project.assignedTo}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
    });

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fonction pour basculer entre la vue en grille et la vue en tableau
    const toggleGridView = () => {
        setGridView(!gridView);
    };

    // Fonction pour gérer la modification du projet
    const handleEditProject = (projectId) => {
        router.get(`/projects/edit/${projectId}`);
    };

    // Fonction pour gérer la suppression du projet
    const handleDeleteProject = (projectId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
            // Logique pour supprimer le projet (ex: faire une requête DELETE)
            console.log(`Supprimer le projet avec ID: ${projectId}`);
        }
    };

    // Définir les colonnes pour le DataGrid
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "reference",
            headerName: "Référence",
            width: 150,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span className="h-full w-full">{params.value}</span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            field: "label",
            headerName: "Libellé",
            width: 200,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span className="h-full w-full">{params.value}</span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            field: "startDate",
            headerName: "Date début",
            width: 150,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span className="h-full w-full">{params.value}</span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            field: "endDate",
            headerName: "Date fin",
            width: 150,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span className="h-full w-full">{params.value}</span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            field: "assignedTo",
            headerName: "Assigné à",
            width: 150,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span className="h-full w-full">{params.value}</span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            field: "status",
            headerName: "Statut",
            width: 150,
            renderCell: (params) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <span
                            style={{
                                color: projectStatuses.find(
                                    (s) => s.value === params.value
                                )?.color,
                            }}
                            className="h-full w-full"
                        >
                            {getStatusLabel(params.value)}
                        </span>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => handleEditProject(params.row.id)}
                        >
                            Modifier
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => handleDeleteProject(params.row.id)}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        // Ajouter d'autres colonnes si nécessaire
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <MyHeader
                    title="Projets"
                    breadcrumbItems={[
                        { label: "Home", href: "/" },
                        { label: "Projets" },
                    ]}
                    right={
                        <div className="flex space-x-4">
                            {/* Un button grid view et table view */}
                            <button onClick={toggleGridView}>
                                {gridView ? <GridIcon /> : <TableView />}
                            </button>
                            <div className="flex items-center bg-gray-50 pr-2 border rounded-md overflow-hidden dark:bg-gray-800">
                                <Input
                                    className="p-2 bg-gray-50 dark:bg-gray-800"
                                    placeholder="Rechercher un projet..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
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
            <Head title="Projets" />
            <div className="mx-auto p-6 pt-0 space-y-5">
                {gridView ? (
                    <Grid container spacing={2}>
                        {paginatedProjects.map((project) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={project.id}
                            >
                                <Card
                                    sx={{
                                        backgroundColor: "background.paper",
                                        boxShadow: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">
                                            {project.label}
                                        </Typography>
                                        <Typography variant="body2">
                                            Référence: {project.reference}
                                        </Typography>
                                        <Typography variant="body2">
                                            Date début: {project.startDate}
                                        </Typography>
                                        <Typography variant="body2">
                                            Date fin: {project.endDate}
                                        </Typography>
                                        <Typography variant="body2">
                                            Assigné à: {project.assignedTo}
                                        </Typography>
                                        <Typography variant="body2">
                                            Statut:{" "}
                                            {getStatusLabel(project.status)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Visibilité: {project.visibility}
                                        </Typography>
                                        <Typography variant="body2">
                                            Montant opportunité:{" "}
                                            {project.opportunityAmount}
                                        </Typography>
                                        <Typography variant="body2">
                                            Probabilité opportunité:{" "}
                                            {Math.round(
                                                project.opportunityProbability *
                                                    100
                                            )}
                                            %
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{ height: 400, width: "100%" }}
                        className="bg-white dark:bg-gray-900"
                    >
                        <DataGrid
                            rows={paginatedProjects}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                        />
                    </Box>
                )}
                <Pagination
                    count={Math.ceil(filteredProjects.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                />
            </div>
        </AuthenticatedLayout>
    );
}
