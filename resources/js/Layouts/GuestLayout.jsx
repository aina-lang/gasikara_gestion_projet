import ApplicationLogo from "@/Components/ApplicationLogo";

import { Link, usePage } from "@inertiajs/react";
import { Alert, Snackbar } from "@mui/material";

import { useEffect, useState } from "react";

export default function Guest({ children }) {
    const { flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    console.log(flash);
    useEffect(() => {
        if (flash) {
            if (flash.success) {
                setMessage(flash.success);
                setSeverity("success");
                setOpen(true);
            } else if (flash.error) {
                setMessage(flash.error);
                setSeverity("error");
                setOpen(true);
            }
        }
    }, [flash]);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className=" fill-current text-gray-500 text-2xl dark:text-white" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    className="cursor-pointer shadow-lg"
                >
                    <Alert onClose={handleClose} severity={severity}>
                        <span dangerouslySetInnerHTML={{ __html: message }} />
                    </Alert>
                </Snackbar>
                {children}
            </div>
        </div>
    );
}
