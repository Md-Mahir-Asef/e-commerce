import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Upload, Image as ImageIcon } from "lucide-react";

type Category = { id: number; name: string };

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
        () => new Set(),
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);
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
                    { withCredentials: true },
                );
                setCategories(
                    Array.isArray(response.data?.data)
                        ? response.data.data
                        : [],
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

    const handleImageUpload = async (files: FileList) => {
        setUploadingImages(true);
        const newImages: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append("image", file);

                const response = await axios.post(
                    `${config.VITE_SERVER_BASE_URL}/upload`,
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );

                if (response.data?.data?.filename) {
                    newImages.push(response.data.data.filename);
                }
            }

            setImages((prev) => [...prev, ...newImages]);
            if (newImages.length > 0) {
                toast.success(
                    `${newImages.length} image(s) uploaded successfully.`,
                );
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to upload images.");
        } finally {
            setUploadingImages(false);
        }
    };

    const handleRemoveImage = (imageName: string) => {
        setImages((prev) => prev.filter((img) => img !== imageName));
    };

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
                { withCredentials: true },
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
                {/* Left: Image upload & preview */}
                <div className="flex flex-col border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <h2 className="text-xl font-medium mb-3">Product Images</h2>

                    {/* Upload area */}
                    <div className="mb-4">
                        <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center min-h-48 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg cursor-pointer hover:border-gray-500 dark:hover:border-gray-400 transition-colors"
                        >
                            <input
                                id="image-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                    ) {
                                        handleImageUpload(e.target.files);
                                    }
                                }}
                                disabled={uploadingImages}
                                className="hidden"
                            />
                            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                                {uploadingImages ? (
                                    <>
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                                        <span className="text-sm">
                                            Uploading...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={32} className="mb-2" />
                                        <span className="text-sm font-medium">
                                            Click to upload images
                                        </span>
                                        <span className="text-xs mt-1">
                                            PNG, JPG, GIF up to 10MB
                                        </span>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Image previews */}
                    {images.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Uploaded Images ({images.length})
                            </h3>
                            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                {images.map((imageName) => (
                                    <div
                                        key={imageName}
                                        className="relative group border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden"
                                    >
                                        <img
                                            src={`${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`}
                                            alt={imageName}
                                            className="w-full h-24 object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder-image.png";
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(imageName)
                                            }
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label={`Remove ${imageName}`}
                                        >
                                            <X size={12} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                            {imageName}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {images.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                            <ImageIcon size={32} className="mb-2" />
                            <span className="text-sm">
                                No images uploaded yet
                            </span>
                        </div>
                    )}
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
                                                                        prev,
                                                                    );
                                                                next.delete(
                                                                    name,
                                                                );
                                                                return next;
                                                            },
                                                        );
                                                    }}
                                                    className="ml-0.5 hover:bg-gray-400 dark:hover:bg-gray-500 rounded p-0.5 leading-none"
                                                    aria-label={`Remove ${name}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ),
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
                                                        c.name,
                                                    ),
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
                                                                    prev,
                                                                ).add(c.name),
                                                        );
                                                        setCategoryDropdownOpen(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    {c.name}
                                                </li>
                                            ))}
                                        {categories.filter(
                                            (c) =>
                                                !selectedCategories.has(c.name),
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
