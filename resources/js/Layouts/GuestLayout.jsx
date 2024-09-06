import ApplicationLogo from "@/Components/ApplicationLogo";
import flasher from "@flasher/flasher";
import { Link, usePage } from "@inertiajs/react";
// import flasher from "@flasher/flasher";
import { useEffect } from "react";

export default function Guest({ children, messages }) {
  
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className=" fill-current text-gray-500 text-2xl dark:text-white" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
