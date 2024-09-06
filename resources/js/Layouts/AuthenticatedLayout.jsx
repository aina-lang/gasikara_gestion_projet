import { useEffect, useState } from "react";

import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import MySidebar from "../Components/MySidebar";

import {
    ChevronLeft,
    Fullscreen,
    ListTodoIcon,
    Moon,
    SearchIcon,
    Sun,
    Users2Icon,
} from "lucide-react";
import PrimaryButton from "../Components/PrimaryButton";
import { GridAddIcon } from "@mui/x-data-grid";
import SecondaryButton from "../Components/SecondaryButton";
import { Divider } from "@mui/material";
import { Input } from "@headlessui/react";
import { router } from "@inertiajs/react";

export default function Authenticated({ user, header, children, messages }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("dark-mode") === "true";
    });

    useEffect(() => {
        const darkMode = localStorage.getItem("dark-mode");

        if (darkMode === "false" || !darkMode) {
            document.querySelector("html").classList.remove("dark");
            document.documentElement.style.colorScheme = "light";
        } else {
            document.querySelector("html").classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("dark-mode", newMode.toString());
            return newMode;
        });
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        setIsFullScreen(!isFullScreen);
    };

    function getInitials(name) {
        return name
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("");
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
            <MySidebar user={user} />

            <div className="flex-grow overflow-y-hidden">
                {/* Navbar */}
                <nav className="bg-white dark:bg-gray-800 m-1 rounded shadow-md py-1 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Side (Optional Breadcrumbs or Back Button) */}
                        <div className="flex items-center">
                            {/* Example Breadcrumb (Customize as needed) */}
                            {/* <NavLink
                                href={route("home")}
                                className="hidden space-x-2 sm:flex items-center"
                            >
                                <ChevronLeft className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    Home
                                </span>
                            </NavLink> */}
                        </div>

                        {/* Right Side (Search, Buttons, User Dropdown) */}
                        <div className="flex items-center space-x-4">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-800" />
                                )}
                            </button>

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={toggleFullScreen}
                                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                            >
                                <Fullscreen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            {/* Search Bar */}
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                                />
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center space-x-2">
                                <SecondaryButton className="bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                                    <GridAddIcon className="mr-2" />
                                    Task
                                </SecondaryButton>
                                <PrimaryButton
                                    onClick={() => router.get("/projects/add")}
                                >
                                    <GridAddIcon className="mr-2" />
                                    Project
                                </PrimaryButton>
                            </div>

                            {/* User Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center focus:outline-none">
                                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                                                {getInitials(user.login)}
                                            </span>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content align="right">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Signed in as:
                                            <div className="font-bold">
                                                {user.login}
                                            </div>
                                        </div>
                                        <Divider />
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Dropdown */}
                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("home")}
                                active={route().current("home")}
                            >
                                Home
                            </ResponsiveNavLink>
                        </div>
                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-700">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-300">
                                    {user.login}
                                </div>
                                <div className="font-medium text-sm text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="p-5 overflow-y-auto h-screen pb-20">
                    {header}
                    {children}
                </main>
            </div>
        </div>
    );
}
