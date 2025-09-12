import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Health from "./pages/Health";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import RouteProtector from "./components/RouteProtector";
import Dashboard from "./pages/admin/Dashboard";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/health" element={<Health />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <RouteProtector roles={["admin", "visitor"]} redirectionUrl="/">
                            <Dashboard />
                        </RouteProtector>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
