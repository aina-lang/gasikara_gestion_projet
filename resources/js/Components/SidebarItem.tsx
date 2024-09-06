import { useEffect, useState } from "react";
import { usePage, Link as InertiaLink } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import React from "react";

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    expanded: boolean;
    subMenu?: SubMenuItemProps[] | null;
    link?: string;
}

interface SubMenuItemProps
    extends Omit<SidebarItemProps, "expanded" | "subMenu"> {
    active?: boolean;
}

function HoveredSubMenuItem({
    icon,
    text,
    active = false,
    link,
}: SubMenuItemProps) {
    return (
        <InertiaLink
            href={link || "#"}
            className={`my-2 flex items-center rounded-md p-2 text-gray-600 ${
                active
                    ? "text-white bg-blue-500"
                    : "text-gray-600 hover:bg-blue-50"
            }`}
        >
            <span className="text-primary-500 h-6 w-6">{icon}</span>
            <span className="ml-3 w-28 text-start">{text}</span>
        </InertiaLink>
    );
}

function Tooltip({
    content,
    position,
    onMouseLeave,
    onMouseEnter,
}: {
    content: React.ReactNode;
    position: { top: number; left: number };
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}) {
    return (
        <div
            className="absolute bg-white shadow-lg rounded-lg p-2 z-50"
            style={{
                top: position.top,
                left: position.left,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {content}
        </div>
    );
}

export default function SidebarItem({
    icon,
    text,
    expanded = false,
    subMenu = null,
    link = "#",
}: SidebarItemProps) {
    const [expandSubMenu, setExpandSubMenu] = useState(false);
    const [active, setActive] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const { url } = usePage();
    let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

    useEffect(() => {
        setActive(url === link);
        if (url === link) {
            setExpandSubMenu(true);
        }
    }, [url, link]);

    useEffect(() => {
        if (!expanded) {
            setExpandSubMenu(false);
        }
    }, [expanded]);

    const handleSubMenuToggle = () => {
        setExpandSubMenu((curr) => !curr);
    };

    const handleMouseEnter = (event: React.MouseEvent) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }

        if (!expanded) {
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltipPosition({
                top: rect.top,
                left: rect.right + 20,
            });
            setHovered(true);
        }
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => {
            setHovered(false);
        }, 20);
    };

    const subMenuHeight = expandSubMenu
        ? `${((subMenu?.length || 0) * 55 + (subMenu ? 15 : 0)).toString()}px`
        : 0;

    const tooltipContent = subMenu ? (
        <ul className="sub-menu">
            {subMenu.map((item, index) => (
                <li key={index}>
                    <HoveredSubMenuItem
                        icon={item.icon}
                        text={item.text}
                        link={item.link}
                        active={item.active}
                    />
                </li>
            ))}
        </ul>
    ) : (
        <InertiaLink
            href={link}
            className={`
        group relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors my-1
        ${active ? "text-white bg-blue-500" : "text-gray-600 hover:bg-blue-50"}
        ${!expanded && "hidden sm:flex"}
    `}
        >
            <span className="h-6 w-6">{icon}</span>
            <span
                className={`overflow-hidden text-start transition-all ${"ml-3 w-44"}`}
            >
                {text}
            </span>
        </InertiaLink>
    );

    return (
        <>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {subMenu ? (
                    <button
                        className={`
                        group relative my-1 flex w-full cursor-pointer
                        items-center rounded-md px-3
                        py-2 font-medium transition-colors text-gray-600 hover:bg-blue-50
                        ${!expanded && "hidden sm:flex"}
                    `}
                        onClick={handleSubMenuToggle}
                    >
                        <span className="h-6 w-6">{icon}</span>
                        <span
                            className={`overflow-hidden text-start transition-all ${
                                expanded ? "ml-3 w-44" : "w-0 hidden"
                            }`}
                        >
                            {text}
                        </span>
                        <div
                            className={`${
                                expanded ? "" : "hidden"
                            } absolute top-2 right-2 h-4 w-4 ${
                                expandSubMenu || active
                                    ? "rotate-90"
                                    : "rotate-0"
                            } transition-transform`}
                        >
                            <ChevronRight />
                        </div>
                    </button>
                ) : (
                    <InertiaLink
                        href={link}
                        className={`
                        group relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors my-1
                        ${
                            active
                                ? "text-white bg-blue-500"
                                : "text-gray-600 hover:bg-blue-50"
                        }
                        ${!expanded && "hidden sm:flex"}
                    `}
                    >
                        <span className="h-6 w-6">{icon}</span>
                        <span
                            className={`overflow-hidden text-start transition-all ${
                                expanded ? "ml-3 w-44" : "w-0 hidden"
                            }`}
                        >
                            {text}
                        </span>
                    </InertiaLink>
                )}
            </li>
            {subMenu && (
                <>
                    <ul
                        className="sub-menu pl-6"
                        style={{ height: subMenuHeight }}
                    >
                        {expanded &&
                            subMenu.map((item, index) => (
                                <li key={index}>
                                    <HoveredSubMenuItem
                                        icon={item.icon}
                                        text={item.text}
                                        link={item.link}
                                        active={url === item.link}
                                    />
                                </li>
                            ))}
                    </ul>
                </>
            )}
            {hovered && !expanded && (
                <Tooltip
                    content={tooltipContent}
                    position={tooltipPosition}
                    onMouseEnter={() =>
                        handleMouseEnter({} as React.MouseEvent)
                    }
                    onMouseLeave={handleMouseLeave}
                />
            )}
        </>
    );
}
