import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = ({
    options,
}: {
    options: string[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div
            style={{ width: `${width}px`, minWidth: `${width}px` }}
            className={`relative box-border`}
            ref={dropdownRef}
        >
            <button
                onClick={toggleDropdown}
                className="w-full px-4 py-2 rounded text-left flex flex-row font-bold cursor-pointer box-border whitespace-nowrap"
            >
                {selected || options[0]}
                <ChevronDown
                    className={`pt-1 transform transition-transform duration-150 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 rounded bg-white box-border whitespace-nowrap">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
