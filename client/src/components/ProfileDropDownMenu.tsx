import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ProfileDropDownMenuProps {
    label: ReactNode;
    items: { name: ReactNode; onClick: () => void }[];
    width: number;
}

export default function ProfileDropDownMenu({
    label,
    items,
    width,
}: ProfileDropDownMenuProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/*  <div className="inline-block"> */}
            <button onClick={() => setOpen((prev) => !prev)}>{label}</button>

            {open && (
                <div
                    className="absolute top-10 right-0 mt-2 w-fit bg-white border border-gray-200 rounded-xs shadow-lg text-center"
                    style={{ width: `${width}px` }}
                >
                    <ul className="py-1">
                        {items.map((item, idx) => (
                            <li
                                key={idx}
                                onClick={() => {
                                    item.onClick();
                                    setOpen(false);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
