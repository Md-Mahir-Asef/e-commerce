import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

export type Category = {
    id: number;
    name: string;
};

interface CategoryListProps {
    categories: Category[];
    onRename: (id: number, newName: string) => Promise<void> | void;
    onDelete: (id: number) => Promise<void> | void;
    renamingId?: number | null;
}

export default function CategoryList({
    categories,
    onRename,
    onDelete,
    renamingId = null,
}: CategoryListProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");

    const startEditing = (category: Category) => {
        if (renamingId) return;
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const cancelEditing = () => {
        if (renamingId) return;
        setEditingId(null);
        setEditingName("");
    };

    const commitRename = async () => {
        if (!editingId || renamingId) return;
        const trimmed = editingName.trim();
        if (!trimmed) {
            cancelEditing();
            return;
        }
        const original = categories.find((c) => c.id === editingId);
        if (!original || original.name === trimmed) {
            cancelEditing();
            return;
        }
        await onRename(editingId, trimmed);
        cancelEditing();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            void commitRename();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
        }
    };

    if (categories.length === 0) {
        return (
            <p className="text-sm text-gray-500 dark:text-gray-400">
                No categories yet. Create your first one above.
            </p>
        );
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => {
                const isEditing = editingId === category.id;
                const isBusy = renamingId === category.id;

                return (
                    <div
                        key={category.id}
                        className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                            if (!isEditing && !isBusy) {
                                startEditing(category);
                            }
                        }}
                    >
                        {isEditing ? (
                            <Input
                                autoFocus
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                onBlur={() => void commitRename()}
                                onKeyDown={handleKeyDown}
                                disabled={isBusy}
                                className="h-8 text-sm"
                            />
                        ) : (
                            <>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-sm font-medium">
                                        {category.name}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm(`Delete category "${category.name}"?`)) {
                                                void onDelete(category.id);
                                            }
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all"
                                        title="Delete category"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="text-[10px] uppercase tracking-wide text-gray-400 group-hover:text-blue-500">
                                    {isBusy ? "Saving…" : "Click to edit"}
                                </span>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
