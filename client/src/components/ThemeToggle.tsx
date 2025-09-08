import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);

    return (
        <div className="flex flex-row p-3 pr-2" onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
        </div>
    );
}
