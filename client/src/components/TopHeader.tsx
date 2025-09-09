import { X } from "lucide-react";

export default function TopHeader() {
    const offDisplay = () => {
        const element = document.querySelector("#topHeaderRoot");
        element?.classList.add("hidden");
    };
    return (
        <div
            id="topHeaderRoot"
            className="relative py-1 flex flex-row bg-green-100 dark:bg-green-950"
        >
            <p className="text-xm opacity-75 text-green-950 mx-auto pr-12 dark:text-white">
                This is website not for commercial use, all the products are
                fake and the payment gateway is made for testing purposes. You
                can access the admin dashboard with the username: admin and
                password: pass@123{" "}
            </p>

            <button
                onClick={offDisplay}
                className="absolute right-4 text-green-600 rounded-full cursor-pointer border border-transparent hover:text-white hover:bg-red-800 hover:border-red-700"
            >
                <X />
            </button>
        </div>
    );
}
