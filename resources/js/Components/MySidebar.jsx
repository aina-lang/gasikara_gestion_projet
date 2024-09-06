import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import {
    ArrowLeftRight,
    ArrowRightLeft,
    CalendarFold,
    CogIcon,
    EllipsisVerticalIcon,
    HomeIcon,
    LayoutDashboard,
    ListTodoIcon,
    PersonStandingIcon,
    Settings2Icon,
    UserIcon,
    WorkflowIcon,
} from "lucide-react";

import ApplicationLogo from "./ApplicationLogo";
import { CategoryOutlined, Timelapse } from "@mui/icons-material";
import { Button } from "@headlessui/react";
import Dropdown from "./Dropdown";
import { Link } from "@inertiajs/react";

// This sidebar component is for both mobile and desktop
function MySidebar({ children, expanded, setExpanded, user }) {
    return (
        <div
            className={`relative bg-white dark:bg-gray-800 ${
                expanded ? "w-5/6 sm:w-56 md:w-1/5 lg:w-1/5" : "w-0 sm:w-20"
            }`}
        >
            {/* Background overlay */}
            <div
                className={`fixed inset-0 -z-10  block bg-gray-900/50 backdrop-blur-sm ${
                    expanded ? "block sm:hidden" : "hidden"
                }`}
            />

            <aside
                className={`box-border overflow-y-auto h-screen transition-all duration-300 ease-in-out shadow-md bg-white dark:bg-gray-800 `}
            >
                <nav className="flex h-full flex-col ">
                    {/* Logo and Toggle Button */}
                    <div className="w-full pb-2 absolute z-50 pt-0">
                        <div
                            className={`${
                                expanded
                                    ? "space-x-4 bg-white dark:bg-gray-800"
                                    : "hidden sm:flex"
                            } flex items-center justify-center pt-3 p-4`}
                        >
                            <Link href="/">
                                <ApplicationLogo
                                    className={
                                        !expanded
                                            ? "w-0 hidden"
                                            : "w-full font-bold text-md text-blue-500 dark:text-gray-400"
                                    }
                                />
                            </Link>
                            <button
                                onClick={() => setExpanded((curr) => !curr)}
                                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                {expanded ? (
                                    <ArrowRightLeft className="h-7 w-full text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <ArrowLeftRight className="h-7 w-full text-gray-600 dark:text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <ul className="flex-1 px-3 mt-24 pb-24">{children}</ul>
                </nav>
            </aside>
            {/* User Profile Section */}
            <div className="flex border-t border-gray-200 dark:border-gray-700 p-3 absolute bottom-0 bg-white dark:bg-gray-800 min-w-full">
                <div
                    className={`
                                flex items-center justify-between
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${expanded ? "ml-3 min-w-full" : "w-0"}
                            `}
                >
                    <div className="flex items-center space-x-2">
                        {/* User Avatar */}
                        <img
                            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
                            alt=""
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        {/* User Info */}
                        {expanded && (
                            <div className="leading-4">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-300">
                                    {user.login}
                                </h4>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    mark@gmail.com
                                </span>
                            </div>
                        )}
                    </div>
                    {/* Dropdown Menu (Optional) */}
                    <Button>
                        <EllipsisVerticalIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function MakeSidebar({ user }) {
    const [expanded, setExpanded] = useState(true);
    const navBarItems = [
        {
            icon: <LayoutDashboard />,
            text: "Tableau de Bord",
            active: true,
            link: "/",
        },
        {
            icon: <WorkflowIcon />,
            text: "Projets",
            subMenu: [
                {
                    icon: <WorkflowIcon />,
                    text: "Tous les Projets",
                    link: "/projects/",
                },

                {
                    icon: <CogIcon />,
                    text: "Paramètres des Projets",
                    link: "/projects/settings",
                },
            ],
            link: "/projects",
        },
        {
            icon: <ListTodoIcon />,
            text: "Tâches",
            link: "/tasks/",
        },
        {
            icon: <CategoryOutlined />,
            text: "Catégories",
            link: "/categories/",
        },

        {
            icon: <Timelapse />,
            text: "Suivi du temps",
            link: "/settings",
        },
        {
            icon: <CalendarFold />,
            text: "Evénements",
            link: "/settings",
        },
        {
            icon: <PersonStandingIcon />,
            text: "Conférence",
            link: "/settings",
        },
        {
            icon: <Settings2Icon />,
            text: "Paramètres",
            link: "/settings",
        },
    ];

    return (
        <MySidebar expanded={expanded} setExpanded={setExpanded} user={user}>
            {navBarItems.map((item, index) => (
                <SidebarItem key={index} expanded={expanded} {...item} />
            ))}
        </MySidebar>
    );
}

// import React, { useState } from "react";
// import SidebarItem from "./SidebarItem";
// import {
//     ArrowLeftRight,
//     ArrowRightLeft,
//     CalendarFold,
//     CogIcon,
//     EllipsisVerticalIcon,
//     LayoutDashboard,
//     ListTodoIcon,
//     PersonStandingIcon,
//     Settings2Icon,
//     WorkflowIcon,
// } from "lucide-react";
// import ApplicationLogo from "./ApplicationLogo";
// import { Button } from "@headlessui/react";
// import { Link } from "@inertiajs/react";
// import { Timelapse } from "@mui/icons-material";

// function MySidebar({ children, expanded, setExpanded, user }) {
//     return (
//         <div
//             className={`relative  box-border h-screen   transition-all duration-300 ease-in-out shadow-md bg-white dark:bg-gray-800 ${
//                 expanded ? "w-5/6 sm:w-64 md:w-1/3 lg:w-1/4" : "w-0 sm:w-20"
//             }`}
//         >
//             {/* Background overlay for mobile view */}
//             <div
//                 className={`fixed inset-0 -z-10 bg-gray-900/50 backdrop-blur-sm ${
//                     expanded ? "block sm:hidden" : "hidden"
//                 }`}
//                 onClick={() => setExpanded(false)}
//             />
//             {/* Logo and Toggle Button */}
//             <div className="w-full pb-2  pt-0 absolute top-0 left-0 z-20" >
//                 <div
//                     className={`${
//                         expanded
//                             ? "space-x-4 bg-white dark:bg-gray-800"
//                             : "hidden sm:flex"
//                     } flex items-center justify-center pt-3 p-4`}
//                 >
//                     <Link href="/">
//                         <ApplicationLogo
//                             className={
//                                 !expanded
//                                     ? "w-0 hidden"
//                                     : "w-full font-bold text-md text-blue-500 dark:text-gray-400"
//                             }
//                         />
//                     </Link>
//                     <button
//                         onClick={() => setExpanded((curr) => !curr)}
//                         className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                     >
//                         {expanded ? (
//                             <ArrowRightLeft className="h-8 w-full text-gray-600 dark:text-gray-400" />
//                         ) : (
//                             <ArrowLeftRight className="h-8 w-full text-gray-600 dark:text-gray-400" />
//                         )}
//                     </button>
//                 </div>
//             </div>

//             <aside className="  overflow-y-auto relative h-full">
//                 <nav className="flex  flex-col h-full ">
//                     {/* Navigation Items */}
//                     <ul className="flex-1 px-3 mt-24 pb-24">{children}</ul>
//                 </nav>
//             </aside>
//             {/* User Profile Section */}
//             <div className="flex border-t border-gray-200 dark:border-gray-700 p-3 absolute bottom-0 bg-white dark:bg-gray-800 min-w-full left-0">
//                 <div
//                     className={`flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out ${
//                         expanded ? "ml-3 min-w-full" : "w-0"
//                     }`}
//                 >
//                     <div className="flex items-center space-x-2">
//                         {/* User Avatar */}
//                         <img
//                             src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
//                             alt=""
//                             className="h-8 w-8 rounded-full object-cover"
//                         />
//                         {/* User Info */}
//                         {expanded && (
//                             <div className="leading-4">
//                                 <h4 className="font-semibold text-gray-800 dark:text-gray-300">
//                                     {user.login}
//                                 </h4>
//                                 <span className="text-xs text-gray-600 dark:text-gray-400">
//                                     mark@gmail.com
//                                 </span>
//                             </div>
//                         )}
//                     </div>
//                     {/* Dropdown Menu (Optional) */}
//                     <Button>
//                         <EllipsisVerticalIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function MakeSidebar({ user }) {
//     const [expanded, setExpanded] = useState(false);

//     const navBarItems = [
//         {
//             icon: <LayoutDashboard />,
//             text: "Tableau de Bord",
//             active: true,
//             link: "/",
//         },
//         {
//             icon: <WorkflowIcon />,
//             text: "Projets",
//             subMenu: [
//                 {
//                     icon: <WorkflowIcon />,
//                     text: "Tous les Projets",
//                     link: "/projects/",
//                 },
//                 {
//                     icon: <CogIcon />,
//                     text: "Paramètres des Projets",
//                     link: "/projects/settings",
//                 },
//             ],
//             link: "/projects",
//         },
//         {
//             icon: <ListTodoIcon />,
//             text: "Tâches",
//             subMenu: [
//                 {
//                     icon: <WorkflowIcon />,
//                     text: "Toutes les Tâches",
//                     link: "/tasks/",
//                 },
//                 {
//                     icon: <CogIcon />,
//                     text: "Paramètres des Tâches",
//                     link: "/tasks/settings",
//                 },
//             ],
//             link: "/tasks",
//         },
//         {
//             icon: <Timelapse />,
//             text: "Suivi du temps",
//             link: "/time-tracking",
//         },
//         {
//             icon: <CalendarFold />,
//             text: "Événements",
//             link: "/events",
//         },
//         {
//             icon: <PersonStandingIcon />,
//             text: "Conférence",
//             link: "/conference",
//         },
//         {
//             icon: <Settings2Icon />,
//             text: "Paramètres",
//             link: "/settings",
//         },
//     ];

//     return (
//         <MySidebar expanded={expanded} setExpanded={setExpanded} user={user}>
//             {navBarItems.map((item, index) => (
//                 <SidebarItem key={index} expanded={expanded} {...item} />
//             ))}
//         </MySidebar>
//     );
// }
