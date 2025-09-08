import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CategoryDropdownMenu = ({ categories, width }: { categories: string[], width: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>("All Categories");

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="p-3 cursor-pointer font-semibold flex flex-row justify-center" style={{width: `${width}px`}}>
                    {selected}
                    <ChevronDown className={isOpen ? "rotate-180" : ""} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{width: `${width}px`}}>
                {categories.map((val, ind) => (
                    <DropdownMenuItem
                        key={ind}
                        onSelect={() => setSelected(val)}
                    >
                        {val}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CategoryDropdownMenu;
