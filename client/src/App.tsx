import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Health from "./pages/Health";
import Profile from "./pages/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/health" element={<Health />} />
                <Route path="/profile/:id" element={<Profile />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
