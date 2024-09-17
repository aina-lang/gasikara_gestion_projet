import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import MyHeader from "@/Components/Header";
import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Button,
    Badge,
    Typography,
} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    MonetizationOn,
    CalendarToday,
    AccountTreeOutlined,
} from "@mui/icons-material";
import { GridAddIcon } from "@mui/x-data-grid";
import { EuroIcon } from "lucide-react";
import CustomTabs from "@/Components/CustomTab";

export default function ShowProject({ auth, project }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Projets", href: "/projects" },
        { label: project.title, href: `/projects/${project.id}` },
    ];

    // Tab content for each tab
    const tabContent = [
        {
            label: "Projet",
            content: (
                <>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                mb: 2,
                            }}
                        >
                            <AccountTreeOutlined sx={{ mr: 1 }} />
                            {project.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary", mb: 4 }}
                            className="flex space-x-4"
                        >
                            {project.description ||
                                "Pas de description disponible."}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            <strong>Référence: </strong>
                            {project.ref}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <CalendarToday sx={{ mr: 1 }} />
                            <strong>Date de début: </strong>
                            {new Date(project.dateo).toLocaleDateString()}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <CalendarToday sx={{ mr: 1 }} />
                            <strong>Date de fin: </strong>
                            {new Date(project.datee).toLocaleDateString()}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <MonetizationOn sx={{ mr: 1 }} />
                            <strong>Montant de l'opportunité: </strong>
                            {project.opp_amount
                                ? `${project.opp_amount} €`
                                : "Non spécifié"}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <EuroIcon sx={{ mr: 1 }} />
                            <strong>Budget alloué: </strong>
                            {project.budget_amount
                                ? `${project.budget_amount} €`
                                : "Non spécifié"}
                        </Typography>
                    </Grid>
                </>
            ),
        },
        {
            label: (
                <Badge
                    color="secondary"
                    badgeContent={project.contacts?.length || 0}
                >
                    Contacts du projet
                </Badge>
            ),
            content: <div>Contacts du Projet</div>,
        },
        { label: "Tâches", content: <div>Contenu des tâches ici</div> },
        { label: "Temps consommé", content: <div>Temps consommé ici</div> },
        {
            label: "Organisation d'événements",
            content: <div>Organisation ici</div>,
        },
        { label: "Notes", content: <div>Notes ici</div> },
        { label: "Fichiers joints", content: <div>Fichiers joints ici</div> },
        { label: "Événements", content: <div>Événements ici</div> },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <MyHeader
                    title="Détails du projet"
                    breadcrumbItems={breadcrumbItems}
                    right={
                        <div className="flex space-x-4">
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
            <Head title={`Projet - ${project.title}`} />

            <div className="container mx-auto py-8 pt-0 px-4">
                {/* Replace CustomTabs with ReusableTabs */}
                <CustomTabs
                    tabs={tabContent}
                    defaultTab={0}
                    tabProps={{
                        sx: {
                            "& .MuiTab-root": {
                                textTransform: "none",
                                fontWeight: "500",
                                minWidth: 120,
                                padding: "10px 20px",
                            },
                            "& .Mui-selected": {
                                bgcolor: "#f5f5f5",
                                borderRadius: "10px",
                            },
                        },
                    }}
                />

                {/* Action Buttons */}
                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        justifyContent: "start",
                    }}
                    className="space-x-3 "
                >
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() =>
                            router.get(`/projects/edit/${project.id}`)
                        }
                    >
                        Modifier le projet
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => router.delete(`/projects/${project.id}`)}
                    >
                        Supprimer le projet
                    </Button>
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}
