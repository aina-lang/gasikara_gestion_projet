import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Pagination,
    createTheme,
} from "@mui/material";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@headlessui/react";
import { GlobeIcon, GlobeLockIcon, GridIcon, SearchIcon } from "lucide-react";
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
    Lock,
    Person,
    TableView,
    Visibility,
} from "@mui/icons-material";
import { format } from "date-fns";

import { Avatar, Badge } from "@mui/material";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const theme = createTheme({
    mixins: {
        MuiDataGrid: {
            // Pinned columns sections
            pinnedBackground: "#340606",
            // Headers, and top & bottom fixed rows
            containerBackground: "#343434",
        },
    },
});
const UserAvatars = ({ users }) => {
    const maxDisplay = 2;
    const displayedUsers = users.slice(0, maxDisplay);
    const moreCount = users.length - maxDisplay;

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {displayedUsers.map((user, index) => (
                <TooltipProvider key={user.id}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar
                                src={user.avatarUrl}
                                alt={user.firstname}
                                style={{ marginLeft: index > 0 ? -10 : 0 }}
                            />
                        </TooltipTrigger>
                        <TooltipContent
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                borderRadius: "4px",
                                padding: "8px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                fontSize: "0.875rem",
                                zIndex: 99999,
                            }}
                        >
                            <div>
                                <strong>
                                    {user.firstname} {user.lastname}
                                </strong>
                                <div>{user.email}</div>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            {moreCount > 0 && (
                <Badge
                    badgeContent={`+${moreCount}`}
                    color="secondary"
                    style={{ marginLeft: 10 }}
                />
            )}
        </div>
    );
};

// Définir les statuts de projet avec leurs couleurs
const projectStatuses = [
    { label: "En cours", value: "in_progress", color: "blue" },
    { label: "En attente", value: "on_hold", color: "orange" },
    { label: "Terminé", value: "completed", color: "green" },
    { label: "Annulé", value: "canceled", color: "red" },
];

const getStatusLabel = (statusValue) => {
    const status = projectStatuses.find(
        (status) => status.value === statusValue
    );
    return status ? status.label : statusValue;
};

export default function Projects({ auth, projects }) {
    console.log(projects);
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

    const arrayfields = {
        ref: { checked: true },
        title: { checked: true },
        // nom: { checked: true },
        // name_alias: { checked: true },
        // commercial: { checked: true },
        dateo: { checked: true },
        datee: { checked: true },
        public: { checked: true },
        assigned_users: { checked: true },
        fk_opp_status: { checked: true },
        opp_amount: { checked: true },
        // opp_percent: { checked: true },
        // opp_weighted_amount: { checked: true },
        // budget_amount: { checked: true },
        // usage_opportunity: { checked: true },
        // usage_task: { checked: true },
        // usage_bill_time: { checked: true },
        // usage_organize_event: { checked: true },
        // accept_conference_suggestions: { checked: true },
        // accept_booth_suggestions: { checked: true },
        // price_registration: { checked: true },
        // price_booth: { checked: true },
        // login: { checked: true },
    };

    // Fonction pour générer les colonnes du DataGrid
    const generateColumns = (fields) => {
        return Object.keys(fields)
            .map((key) => {
                const field = fields[key];
                switch (key) {
                    case "ref":
                        return {
                            field: "ref",
                            headerName: "Référence",
                            width: 150,
                            renderCell: (params) => (
                                <Link>
                                    <p className="text-blue-500 font-medium">
                                        {params.value || "N/A"}
                                    </p>
                                </Link>
                            ),
                        };
                    case "title":
                        return {
                            field: "title",
                            headerName: "Libellé",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "nom":
                        return {
                            field: "societe",
                            headerName: "Tiers",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "name_alias":
                        return {
                            field: "societe_alias",
                            headerName: "Alias",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "commercial":
                        return {
                            field: "commercial",
                            headerName: "Représentant commercial",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "dateo":
                        return {
                            field: "dateo",
                            headerName: "Date début",
                            width: 250,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "datee":
                        return {
                            field: "datee",
                            headerName: "Date fin",
                            width: 250,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "public":
                        return {
                            field: "public",
                            headerName: "Visibilité",
                            width: 150,
                            renderCell: (params) => (
                                <div className="flex items-center h-full justify-center">
                                    {params.value === "0" ? (
                                        <Lock className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <GlobeIcon className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            ),
                        };
                    case "assigned_users":
                        return {
                            field: "assigned_users",
                            headerName: "Assigné à",
                            width: 250,
                            renderCell: (params) => (
                                <div className="flex items-center">
                                    <UserAvatars users={params.value} />
                                </div>
                            ),
                        };
                    case "fk_opp_status":
                        return {
                            field: "opp_status",
                            headerName: "Statut opportunités",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "opp_amount":
                        return {
                            field: "opp_amount",
                            headerName: "Montant opportunités",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "opp_percent":
                        return {
                            field: "opp_percent",
                            headerName: "Pourcentage opportunités",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "opp_weighted_amount":
                        return {
                            field: "weighted_amount",
                            headerName: "Montant pondéré",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "budget_amount":
                        return {
                            field: "budget_amount",
                            headerName: "Montant budget",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "usage_opportunity":
                        return {
                            field: "usage_opportunity",
                            headerName: "Utilisation opportunité",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "usage_task":
                        return {
                            field: "usage_task",
                            headerName: "Utilisation tâche",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "usage_bill_time":
                        return {
                            field: "usage_bill_time",
                            headerName: "Utilisation facturation",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "usage_organize_event":
                        return {
                            field: "usage_organize_event",
                            headerName: "Utilisation organiser événement",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "accept_conference_suggestions":
                        return {
                            field: "accept_conference_suggestions",
                            headerName: "Accepter suggestions conférence",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "accept_booth_suggestions":
                        return {
                            field: "accept_booth_suggestions",
                            headerName: "Accepter suggestions stand",
                            width: 200,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value === "1" ? "Oui" : "Non"}
                                </p>
                            ),
                        };
                    case "price_registration":
                        return {
                            field: "price_registration",
                            headerName: "Prix inscription",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "price_booth":
                        return {
                            field: "price_booth",
                            headerName: "Prix stand",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    case "login":
                        return {
                            field: "login",
                            headerName: "Login",
                            width: 150,
                            renderCell: (params) => (
                                <p className="text-gray-800 font-medium">
                                    {params.value || "N/A"}
                                </p>
                            ),
                        };
                    default:
                        return null;
                }
            })
            .filter((column) => column !== null);
    };

    const columns = generateColumns(arrayfields);
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
                                {gridView ? (
                                    <GridIcon
                                        size={20}
                                        className="
                                  text-gray-700"
                                    />
                                ) : (
                                    <TableView
                                        className="h-8  w-8 
                                 text-gray-700"
                                    />
                                )}
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
                        sx={{ minHeight: 300, width: "100%" }}
                        className="bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow-sm"
                    >
                        <DataGrid
                            hideFooter
                            rows={paginatedProjects}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            getRowId={(row) => row.rowid}
                            sx={{
                                borderRadius: 0,
                                border: 0,
                                height: "100%",
                                // boxShadow: 2,
                                // border: 2,
                                // borderColor: 'primary.light',
                                // '& .MuiDataGrid-cell:hover': {
                                //   color: 'primary.main',
                                // },
                                "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell":
                                    {
                                        borderRight: "1px solid #303030",
                                        ...theme.applyStyles("light", {
                                            borderRightColor: "#f0f0f0",
                                        }),
                                    },
                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor: "#d1d5db",
                                    color: "#374151",
                                },
                            }}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0
                                    ? "even"
                                    : "odd"
                            }
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

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//     border: 0,
//     color: 'rgba(255,255,255,0.85)',
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     WebkitFontSmoothing: 'auto',
//     letterSpacing: 'normal',
//     '& .MuiDataGrid-columnsContainer': {
//       backgroundColor: '#1d1d1d',
//       ...theme.applyStyles('light', {
//         backgroundColor: '#fafafa',
//       }),
//     },
//     '& .MuiDataGrid-iconSeparator': {
//       display: 'none',
//     },
//     '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
//       borderRight: '1px solid #303030',
//       ...theme.applyStyles('light', {
//         borderRightColor: '#f0f0f0',
//       }),
//     },
//     '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
//       borderBottom: '1px solid #303030',
//       ...theme.applyStyles('light', {
//         borderBottomColor: '#f0f0f0',
//       }),
//     },
//     '& .MuiDataGrid-cell': {
//       color: 'rgba(255,255,255,0.65)',
//       ...theme.applyStyles('light', {
//         color: 'rgba(0,0,0,.85)',
//       }),
//     },
//     '& .MuiPaginationItem-root': {
//       borderRadius: 0,
//     },
//     ...customCheckbox(theme),
//     ...theme.applyStyles('light', {
//       color: 'rgba(0,0,0,.85)',
//     }),
//   }));
