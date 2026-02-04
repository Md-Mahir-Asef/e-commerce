import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryAddBarProps {
    onAdd: (name: string) => Promise<void> | void;
    loading?: boolean;
}

export default function CategoryAddBar({
    onAdd,
    loading = false,
}: CategoryAddBarProps) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed || loading) return;
        await onAdd(trimmed);
        setValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
            <div className="flex-1">
                <label
                    htmlFor="category-name"
                    className="block text-sm font-medium mb-1"
                >
                    New category name
                </label>
                <Input
                    id="category-name"
                    placeholder="e.g. Electronics"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="pt-1 sm:pt-6">
                <Button
                    type="submit"
                    disabled={loading || value.trim().length === 0}
                    className="w-full sm:w-auto"
                >
                    {loading ? "Adding…" : "Add category"}
                </Button>
            </div>
        </form>
    );
}
