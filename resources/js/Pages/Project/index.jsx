import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Pagination,
    createTheme,
    styled,
    IconButton,
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import {
    DataGrid,
    GridAddIcon,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@headlessui/react";
import {
    Calendar,
    Cloud,
    DeleteIcon,
    EditIcon,
    GlobeIcon,
    GlobeLockIcon,
    GridIcon,
    ImageIcon,
    SearchIcon,
    ViewIcon,
} from "lucide-react";

import MyHeader from "@/Components/Header";
import {
    Assessment,
    AttachMoney,
    CalendarToday,
    ContentCopy,
    ContentCut,
    ContentPaste,
    Lock,
    MoreHorizSharp,
    Person,
    PictureAsPdf,
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
import ConfirmModal from "@/Components/ConfirmModal";
import { AvatarIcon, ButtonIcon } from "@radix-ui/react-icons";
import { CardFooter } from "@/components/ui/card";
import { frFR, nlNL } from "@mui/material/locale";

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

const UserAvatars2 = ({ users }) => {
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
                                style={{
                                    marginLeft: index > 0 ? -10 : 0,
                                    width: 25,
                                    height: 25,
                                }}
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

export default function Projects({ auth, projects }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [gridView, setGridView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { delete: deleteRequest } = useForm();
    const filteredProjects = projects.filter((project) => {
        const searchableText =
            `${project.reference} ${project.label} ${project.assignedTo}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
    });

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleGridView = () => {
        if (gridView === false) {
            setItemsPerPage(8);
        } else {
            setItemsPerPage(5);
        }
        setGridView(!gridView);
    };

    const handleEditProject = (projectId) => {
        router.get(`/projects/edit/${projectId}`);
    };

    // Fonction pour gérer la suppression du projet
    const handleDeleteProject = (projectId) => {
        setDialogOpen(true);
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
                                <Link
                                    href={`/projects/show/${params.row.rowid}`}
                                >
                                    <p className="text-indigo-500 font-medium">
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
                                <div className="flex items-center h-full">
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
                                <p className="text-gray-800 font-medium bg-">
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

    columns.unshift({
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        renderCell: (params) => (
            <div className="flex space-x-2 text-sm  h-full w-full">
                {/* <IconButton
                // size="small"
                    aria-label="view"
                    color="primary"
                    onClick={() => handleView(params.row)}
                >
                    <ViewIcon size={20}/>
                </IconButton> */}
                <IconButton
                    aria-label="edit"
                    // color="primary"
                    onClick={() => handleEdit(params.row)}
                >
                    <EditIcon size={20} />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={(event) => {
                        // event.stopPropagation();
                        handleDelete(params.row);
                    }}
                >
                    <DeleteIcon size={20} />
                </IconButton>
                <IconButton
                    aria-label="pdf"
                    color="info"
                    onClick={() => handleExportPDF(params.row)}
                >
                    <PictureAsPdf size={10} />
                </IconButton>
            </div>
        ),
    });

    columns.unshift({
        field: "rowid",
        headerName: "ID",
        width: 0,
        renderCell: () => null,
    });
    // Fonctions de gestion des actions
    const handleView = (row) => {
        console.log("View", row);
        // Logique pour visualiser l'élément
    };

    const handleEdit = (row, event) => {
        // event.current.stopPropagation();
        console.log("Edit", row);
        // Logique pour modifier l'élément
    };

    const [currentFocusRow, setCureentFocusRow] = useState(null);

    const handleDelete = (row) => {
        setCureentFocusRow(row);
        setDialogOpen(true);
        // console.log("Delete", row);
    };

    const handleConfirmDelete = () => {
        console.log(currentFocusRow.rowid);
        deleteRequest(`/projects/delete/${currentFocusRow.rowid}`, {
            onSuccess: () => {
                console.log("yes");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
        setDialogOpen(false);
    };

    const handleExportPDF = (row) => {
        console.log("Export PDF", row);
        // Logique pour exporter en PDF
    };
    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        border: 0,
        borderRadius: 8, // Border radius for the entire grid container
        overflow: "hidden", //
        color: "rgba(255,255,255,0.85)",
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "#1d1d1d",
            ...theme.applyStyles("light", {
                backgroundColor: "#fafafa",
            }),
        },
        // "& .MuiDataGrid-iconSeparator": {
        //     display: "none",
        // },
        "& .MuiDataGrid-columnHeader": {
            paddingHorizontal: 10,
            backgroundColor: "#6875f5",
            color: "white",
        
            // marginTop:10
        },
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: "1px solid #303030",
            ...theme.applyStyles("light", {
                borderRightColor: "#f0f0f0",
            }),
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
            borderBottom: "1px solid #303030",
            ...theme.applyStyles("light", {
                borderBottomColor: "#f0f0f0",
            }),
        },
        "& .MuiDataGrid-cell": {
            color: "rgba(255,255,255,0.65)",
            ...theme.applyStyles("light", {
                color: "rgba(0,0,0,.85)",
            }),
        },
        "& .MuiPaginationItem-root": {
            borderRadius: 0,
        },
        // Style for odd rows
        "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#2d2d2d",
            ...theme.applyStyles("light", {
                backgroundColor: "#f9f9f9",
            }),
        },
        // Style for even rows
        "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#1d1d1d",
            ...theme.applyStyles("light", {
                backgroundColor: "#ffffff",
            }),
        },

        ...theme.applyStyles("light", {
            color: "rgba(0,0,0,.85)",
            "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9",
            },
            // Style for even rows
            "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#ffffff",
            },
        }),
    }));

    function IconMenu() {
        return (
            <Paper sx={{ width: 320, maxWidth: "100%" }}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            ⌘X
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy</ListItemText>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            ⌘C
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Paste</ListItemText>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            ⌘V
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Cloud fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Web Clipboard</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        );
    }

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
                        {paginatedProjects.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        backgroundColor: "background.paper",
                                        // boxShadow:1,
                                        borderRadius: 2,
                                        // transition: "transform 0.2s",
                                        // "&:hover": {
                                        //     transform: "translateY(-5px)",
                                        // },
                                    }}
                                    className="dark:bg-gray-800 dark:text-gray-300 h-full  flex flex-col justify-between"
                                >
                                    <CardContent>
                                        <Box className="flex items-center justify-between mb-2">
                                            <Avatar
                                                // src={user.avatarUrl}
                                                // alt={user.firstname}
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                }}
                                            />
                                            <Button className="bg-transparent shadow-none p-0 hover:bg-transparent ">
                                                <MoreHorizSharp className="text-gray-500" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                className="capitalize font-semibold"
                                            >
                                                {project.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                className="text-gray-600 font-medium"
                                            >
                                                {project.ref}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-gray-600 mt-2 line-clamp-3"
                                            >
                                                {project.description}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardFooter className="p-4 ">
                                        <Box className="flex items-center justify-between w-full">
                                            <Box>
                                                <Box className="flex items-end space-x-2 mb-2">
                                                    <Calendar
                                                        className="text-gray-500"
                                                        size={20}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        className="text-gray-600"
                                                    >
                                                        Début{" "}
                                                        {project.dateo
                                                            ? project.dateo
                                                            : "-"}
                                                    </Typography>
                                                </Box>
                                                <Box className="flex items-end space-x-2">
                                                    <Calendar
                                                        className="text-gray-500"
                                                        size={20}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        className="text-gray-600"
                                                    >
                                                        Fin{" "}
                                                        {project.datee
                                                            ? project.datee
                                                            : "-"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <UserAvatars2
                                                users={project.assigned_users}
                                            />
                                        </Box>
                                    </CardFooter>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{ minHeight: 300, width: "100%" }}
                        className=" rounded-md overflow-hidden "
                    >
                        <StyledDataGrid
                            slots={{
                                toolbar: () => (
                                    <GridToolbarContainer
                                        sx={{ marginBottom: 2 }}
                                    >
                                        <GridToolbarColumnsButton />
                                        {/* <GridToolbarFilterButton /> */}
                                        <GridToolbarDensitySelector
                                            slotProps={{
                                                tooltip: {
                                                    title: "Change density",
                                                },
                                            }}
                                        />
                                        <Box sx={{ flexGrow: 1 }} />
                                        <GridToolbarExport
                                            slotProps={{
                                                tooltip: {
                                                    title: "Export data",
                                                },
                                                button: { variant: "outlined" },
                                            }}
                                        />
                                    </GridToolbarContainer>
                                ),
                            }}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        rowid: false,
                                    },
                                },
                            }}
                            // hideFooter
                            hideFooterPagination
                            rows={paginatedProjects}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            getRowId={(row) => row.rowid}
                            localeText={frFR.components}
                        />
                    </Box>
                )}
                <Pagination
                    count={Math.ceil(filteredProjects.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    className="dark:text-gray-300"
                    lang="fr"
                    // title="nombre des pages"
                />
            </div>

            <ConfirmModal
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={() => handleConfirmDelete()}
                title="Confirmer la suppresion"
                content="Êtes-vous sûr de vouloir supprimer ce projet ?"
            />
        </AuthenticatedLayout>
    );
}
