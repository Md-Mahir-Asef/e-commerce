/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // <-- enables class-based dark mode
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "var(--background)",
                darkText: "var(--foreground)",
            },
        },
    },
    plugins: [],
};
