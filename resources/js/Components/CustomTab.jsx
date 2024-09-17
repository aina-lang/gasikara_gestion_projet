import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Tabs as BaseTabs,
    TabsList as BaseTabsList,
    Tab as BaseTab,
    TabPanel as BaseTabPanel,
} from "@mui/base";
import { useTheme } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === "dark";
}

// Main reusable Tabs component
const CustomTabs = ({ defaultValue, tabs, tabProps }) => {
    const isDarkMode = useIsDarkMode();
    const [selectedTab, setSelectedTab] = React.useState(defaultValue || 0);
    const tabsListRef = React.useRef(null);
    const [showScrollButtons, setShowScrollButtons] = React.useState({
        left: false,
        right: false,
    });

    const updateScrollButtons = () => {
        if (tabsListRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                tabsListRef.current;
            setShowScrollButtons({
                left: scrollLeft > 0,
                right: scrollWidth > clientWidth + scrollLeft,
            });
        }
    };

    React.useEffect(() => {
        updateScrollButtons(); // Initial check
        window.addEventListener("resize", updateScrollButtons); // Check on resize

        return () => window.removeEventListener("resize", updateScrollButtons); // Cleanup on unmount
    }, []);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handlePrevious = () => {
        if (tabsListRef.current) {
            tabsListRef.current.scrollLeft -= 100; // Adjust scroll amount as needed
            updateScrollButtons();
        }
    };

    const handleNext = () => {
        if (tabsListRef.current) {
            tabsListRef.current.scrollLeft += 100; // Adjust scroll amount as needed
            updateScrollButtons();
        }
    };

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="relative flex items-center mb-4">
                <div className="flex-1 overflow-auto" ref={tabsListRef}>
                    <BaseTabs
                        value={selectedTab}
                        onChange={handleChange}
                        {...tabProps}
                    >
                        <div className="relative overflow-hidden">
                            {" "}
                            {showScrollButtons.left && (
                                <button
                                    onClick={handlePrevious}
                                    className="fixed left-10 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 z-10 backdrop-blur-md"
                                >
                                    <ArrowBackIosIcon />
                                </button>
                            )}
                            <TabsList className="mb-4 bg-indigo-500 shadow-md shadow-indigo-500/40 rounded-md  p-2">
                                {tabs.map((tab, index) => (
                                    <Tab key={index} value={index}>
                                        {tab.label}
                                    </Tab>
                                ))}
                            </TabsList>
                            {showScrollButtons.right && (
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 z-10 backdrop-blur-md"
                                >
                                    <ArrowForwardIosIcon />
                                </button>
                            )}
                        </div>
                        {tabs.map((tab, index) => (
                            <TabPanel key={index} value={index} className="p-4">
                                {tab.content}
                            </TabPanel>
                        ))}
                    </BaseTabs>
                </div>
            </div>
        </div>
    );
};

CustomTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
                .isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
    defaultValue: PropTypes.number,
    tabProps: PropTypes.object,
};

// Custom TabsList component
const TabsList = React.forwardRef((props, ref) => {
    const { className, ...other } = props;
    return (
        <BaseTabsList
            ref={ref}
            className={clsx("flex", className)}
            {...other}
        />
    );
});

TabsList.propTypes = {
    className: PropTypes.string,
};

// Custom Tab component
const Tab = React.forwardRef((props, ref) => {
    return (
        <BaseTab
            ref={ref}
            {...props}
            slotProps={{
                ...props.slotProps,
                root: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.root,
                        ownerState
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `font-sans px-2 ${
                                ownerState.selected
                                    ? "text-indigo-500 bg-white"
                                    : "text-white  focus:text-white hover:bg-indigo-400"
                            } ${
                                ownerState.disabled
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer"
                            } text-sm leading-[1.3] font-semibold  py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-indigo-light`,
                            resolvedSlotProps?.className
                        ),
                    };
                },
            }}
        />
    );
});

Tab.propTypes = {
    slotProps: PropTypes.shape({
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
};

// Custom TabPanel component
const TabPanel = React.forwardRef((props, ref) => {
    const { className, ...other } = props;
    return (
        <BaseTabPanel
            ref={ref}
            className={clsx(
                "p-5 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl opacity-60 w-full font-sans text-sm",
                className
            )}
            {...other}
        />
    );
});

TabPanel.propTypes = {
    className: PropTypes.string,
};

// Helper function to resolve slot props
const resolveSlotProps = (fn, args) =>
    typeof fn === "function" ? fn(args) : fn;

export default CustomTabs;
