import { Analytics } from "@vercel/analytics/react";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
            </Routes>
            <Analytics />
        </>
    );
}

export default App;
