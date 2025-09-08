import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean>(() => {
        // Initial state: check localStorage first, then system preference
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") return true;
            if (savedTheme === "light") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");

        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <div
            className="flex flex-row p-3 pr-2 cursor-pointer"
            onClick={() => setDark(!dark)}
        >
            {dark ? (
                <>
                    <Sun /> Light
                </>
            ) : (
                <>
                    <Moon /> Dark
                </>
            )}
        </div>
    );
}
