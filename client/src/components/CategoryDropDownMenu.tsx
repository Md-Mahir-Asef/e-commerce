import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CategoryDropdownMenu = ({
    categories,
    width,
    onCategoryChange,
}: {
    categories: string[];
    width: number;
    onCategoryChange?: (category: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>("All Categories");

    const handleCategorySelect = (category: string) => {
        setSelected(category);
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div
                    className="p-3 cursor-pointer font-semibold flex flex-row justify-center"
                    style={{ width: `${width}px` }}
                >
                    {selected}
                    <ChevronDown className={isOpen ? "rotate-180" : ""} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ width: `${width}px` }}>
                {categories.map((val, ind) => (
                    <DropdownMenuItem
                        key={ind}
                        onSelect={() => handleCategorySelect(val)}
                    >
                        {val}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CategoryDropdownMenu;
