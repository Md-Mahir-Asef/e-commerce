import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
                Showing page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                >
                    <ChevronLeft size={16} />
                </button>

                {getVisiblePages().map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-2 text-muted-foreground">
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`px-3 py-2 rounded-md transition-colors ${
                                    currentPage === page
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                                }`}
                            >
                                {page}
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="text-sm text-muted-foreground">
                Total: {totalPages} pages
            </div>
        </div>
    );
}
