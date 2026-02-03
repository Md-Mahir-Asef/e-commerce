import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

type Category = { id: number; name: string };

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
        () => new Set()
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const categoryContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                categoryDropdownOpen &&
                categoryContainerRef.current &&
                !categoryContainerRef.current.contains(e.target as Node)
            ) {
                setCategoryDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [categoryDropdownOpen]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/product/categories`,
                    { withCredentials: true }
                );
                setCategories(
                    Array.isArray(response.data?.data) ? response.data.data : []
                );
            } catch (err) {
                console.error(err);
            }
        };
        loadCategories();
    }, []);

    const priceNum = price ? parseInt(price, 10) : NaN;
    const discountNum = discountPrice ? parseInt(discountPrice, 10) : NaN;
    const discountPriceError =
        !Number.isNaN(priceNum) &&
        !Number.isNaN(discountNum) &&
        discountNum > priceNum;

    const requiredFieldsFilled =
        name.trim().length > 0 && !Number.isNaN(priceNum) && priceNum > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (discountPriceError) return;
        setSubmitting(true);
        try {
            const categoryNames = Array.from(selectedCategories);

            await axios.post(
                `${config.VITE_SERVER_BASE_URL}/product/product`,
                {
                    data: {
                        name: name.trim(),
                        description: description.trim() || null,
                        price: priceNum,
                        discountPrice: Number.isNaN(discountNum)
                            ? priceNum
                            : discountNum,
                        images,
                        categoryNames,
                    },
                },
                { withCredentials: true }
            );

            toast.success("Product created successfully.");
            setName("");
            setDescription("");
            setPrice("");
            setDiscountPrice("");
            setSelectedCategories(new Set());
            setImages([]);
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "response" in err
                    ? (err as { response?: { data?: { message?: string } } })
                          .response?.data?.message
                    : "Failed to create product.";
            toast.error(message || "Failed to create product.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mr-2">
            <h1 className="text-3xl mb-4">Create Product</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Image upload & preview – implement file receive/handle here */}
                <div className="flex flex-col border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <h2 className="text-xl font-medium mb-3">Product Images</h2>
                    <div className="flex flex-col items-center justify-center min-h-48 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg text-gray-500 dark:text-gray-400">
                        Upload area – add file input and previews here. Use{" "}
                        <code className="text-sm">images</code> state and{" "}
                        <code className="text-sm">setImages</code> when ready.
                    </div>
                </div>

                {/* Right: Product details form */}
                <div className="flex flex-col border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <h2 className="text-xl font-medium mb-3">
                        Product Details
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="name">Name *</label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Product name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Product description"
                                rows={3}
                                className="border border-gray-500 border-opacity-50 rounded-md p-2 outline-none resize-y dark:bg-gray-900 dark:border-gray-600"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price *</label>
                            <Input
                                id="price"
                                type="number"
                                min={1}
                                step={1}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="e.g. 1999"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="discountPrice">
                                Discount price (optional, ≤ price)
                            </label>
                            <Input
                                id="discountPrice"
                                type="number"
                                min={0}
                                step={1}
                                value={discountPrice}
                                onChange={(e) =>
                                    setDiscountPrice(e.target.value)
                                }
                                placeholder="e.g. 1499"
                                className={
                                    discountPriceError
                                        ? "border-red-500"
                                        : undefined
                                }
                            />
                            {discountPriceError && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    Discount price must be less than or equal to
                                    price.
                                </p>
                            )}
                        </div>
                        <div
                            ref={categoryContainerRef}
                            className="flex flex-col relative"
                        >
                            <label>Categories</label>
                            {/* Selected categories first */}
                            {selectedCategories.size > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800/50">
                                    {Array.from(selectedCategories).map(
                                        (name) => (
                                            <span
                                                key={name}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-sm"
                                            >
                                                {name}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategories(
                                                            (prev) => {
                                                                const next =
                                                                    new Set(
                                                                        prev
                                                                    );
                                                                next.delete(
                                                                    name
                                                                );
                                                                return next;
                                                            }
                                                        );
                                                    }}
                                                    className="ml-0.5 hover:bg-gray-400 dark:hover:bg-gray-500 rounded p-0.5 leading-none"
                                                    aria-label={`Remove ${name}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )
                                    )}
                                </div>
                            )}
                            {/* Dropdown trigger and list – wrapper so list aligns below trigger */}
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-500 border-opacity-50 rounded-md min-h-9 p-2 outline-none dark:bg-gray-900 dark:border-gray-600 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
                                    onClick={() =>
                                        setCategoryDropdownOpen((o) => !o)
                                    }
                                    role="combobox"
                                    aria-expanded={categoryDropdownOpen}
                                >
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        Select categories…
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-500 dark:text-gray-400 shrink-0 transition-transform duration-200 ${
                                            categoryDropdownOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>
                                {categoryDropdownOpen && (
                                    <ul
                                        className="absolute z-10 top-full left-0 right-0 mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-48 overflow-auto"
                                        role="listbox"
                                    >
                                        {categories
                                            .filter(
                                                (c) =>
                                                    !selectedCategories.has(
                                                        c.name
                                                    )
                                            )
                                            .map((c) => (
                                                <li
                                                    key={c.id}
                                                    role="option"
                                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCategories(
                                                            (prev) =>
                                                                new Set(
                                                                    prev
                                                                ).add(c.name)
                                                        );
                                                        setCategoryDropdownOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    {c.name}
                                                </li>
                                            ))}
                                        {categories.filter(
                                            (c) =>
                                                !selectedCategories.has(c.name)
                                        ).length === 0 && (
                                            <li className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                                                No more categories
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                discountPriceError ||
                                !requiredFieldsFilled
                            }
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Creating…" : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
