import { Analytics } from "@vercel/analytics/react";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Health from "./pages/Health";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/health" element={<Health />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
