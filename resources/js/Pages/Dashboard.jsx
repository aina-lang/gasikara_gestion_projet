import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    BarChart,
    Gauge,
    LineChart,
    PieChart,
    SparkLineChart,
} from "@mui/x-charts";
import MyHeader from "../Components/Header";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { Input } from "@headlessui/react";
import {
    SearchIcon,
    BriefcaseIcon,
    ClipboardListIcon,
    CalendarIcon,
    UsersIcon,
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import { GridAddIcon } from "@mui/x-data-grid";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function Dashboard({ auth }) {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Dashboard" },
    ];

    const dashboardItems = [
        {
            title: "Projets",
            icon: <BriefcaseIcon className="w-6 h-6 " />,
        },
        {
            title: "Tâches",
            icon: <ClipboardListIcon className="w-6 h-6 " />,
        },
        {
            title: "Evénements",
            icon: <CalendarIcon className="w-6 h-6 " />,
        },
        {
            title: "Conférence",
            icon: <UsersIcon className="w-6 h-6 " />,
        },
    ];
    const gradientBackgrounds = [
        "text-blue-500",
        "text-cyan-500",
        "text-emerald-500",
        "text-orange-500",
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
                            <PrimaryButton
                                className="py-2"
                                onClick={() => router.get("/projects/add")}
                            >
                                <GridAddIcon />
                                opportunité / projet
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto p-6 space-y-5 dark:bg-gray-900">
                <Grid container spacing={3}>
                    {dashboardItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card elevation={1} className="dark:bg-gray-800 ">
                                <CardContent>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            className="dark:text-gray-300 flex justify-between items-center w-full"
                                            // className={`${gradientBackgrounds[index]}`}
                                        >
                                            {item.title}
                                            {item.icon}
                                        </Typography>
                                    
                                    </Box>
                                    <Gauge
                                        width={150}
                                        height={100}
                                        value={60}
                                        min={0}
                                        max={100}
                                        color="white"
                                        // trackColor="gray"
                                        // textColor="white"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card
                            elevation={1}
                            className="min-h-full dark:bg-gray-800 "
                            // sx={{ backgroundColor: "transparent" }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Project Budget
                                </Typography>
                                <BarChart
                                    xAxis={[
                                        {
                                            id: "barCategories",
                                            data: ["Q1", "Q2", "Q3", "Q4"],
                                            scaleType: "band",
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: [2000, 3500, 3000, 4500],
                                            label: "Budget",
                                        },
                                        {
                                            data: [1800, 3200, 2800, 4200],
                                            label: "Expenses",
                                        },
                                    ]}
                                    height={300}
                                    legend={{ hidden: false }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        className="grid grid-cols-1 gap-5"
                    >
                        {/* <Card elevation={1} className="dark:bg-gray-800">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Budget Distribution
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                {
                                                    id: 0,
                                                    value: 30,
                                                    label: "Development",
                                                },
                                                {
                                                    id: 1,
                                                    value: 25,
                                                    label: "Marketing",
                                                },
                                                {
                                                    id: 2,
                                                    value: 20,
                                                    label: "Operations",
                                                },
                                                {
                                                    id: 3,
                                                    value: 15,
                                                    label: "Research",
                                                },
                                                {
                                                    id: 4,
                                                    value: 10,
                                                    label: "Miscellaneous",
                                                },
                                            ],
                                        },
                                    ]}
                                    width={300}
                                    height={200}
                                    legend={{ hidden: false }}
                                />
                            </CardContent>
                        </Card> */}
                        <Card elevation={1} className="dark:bg-gray-800">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Tasks in Progress
                                </Typography>
                                {[
                                    "Design UI",
                                    "Develop Backend",
                                    "Integrate API",
                                ].map((task, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        mb={1}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            className="dark:text-gray-400"
                                        >
                                            Task {index + 1}:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            className="dark:text-white"
                                        >
                                            {task}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                        <Card elevation={1} className="dark:bg-gray-800">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Tasks in Progress
                                </Typography>
                                {[
                                    "Design UI",
                                    "Develop Backend",
                                    "Integrate API",
                                ].map((task, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        mb={1}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            className="dark:text-gray-400"
                                        >
                                            Task {index + 1}:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            className="dark:text-white"
                                        >
                                            {task}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Card elevation={1} className="dark:bg-gray-800">
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            className="dark:text-white"
                        >
                            Additional Budget Overview
                        </Typography>
                        <Box sx={{ flexGrow: 2 }}>
                            <SparkLineChart
                                plotType="bar"
                                data={[
                                    1000, 1400, 1200, 1500, 1700, 1200, 1400,
                                    1600,
                                ]}
                                height={100}
                            />
                        </Box>
                    </CardContent>
                </Card>

                <Card elevation={1} className="dark:bg-gray-800">
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            className="dark:text-white"
                        >
                            Project Timeline
                        </Typography>
                        <LineChart
                            xAxis={[
                                {
                                    data: [
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                    ],
                                },
                            ]}
                            series={[
                                {
                                    data: [
                                        2, 5.5, 2, 8.5, 1.5, 5, 3, 9, 4, 7, 3,
                                        5.5,
                                    ],
                                    label: "Progress",
                                },
                            ]}
                            width={800}
                            height={300}
                        />
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card elevation={1} className="dark:bg-gray-800">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Project Workflow
                                </Typography>
                                <Stepper activeStep={1} alternativeLabel>
                                    {["Planning", "Execution", "Closure"].map(
                                        (label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    )}
                                </Stepper>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card elevation={1} className="dark:bg-gray-800">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="dark:text-white"
                                >
                                    Tasks in Progress
                                </Typography>
                                {[
                                    "Design UI",
                                    "Develop Backend",
                                    "Integrate API",
                                ].map((task, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        mb={1}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            className="dark:text-gray-400"
                                        >
                                            Task {index + 1}:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            className="dark:text-white"
                                        >
                                            {task}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </AuthenticatedLayout>
    );
}
