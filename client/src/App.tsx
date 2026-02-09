import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Health from "./pages/Health";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import RouteProtector from "./components/RouteProtector";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/admin/AdminLayout";
import Users from "./pages/admin/Users";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ProductListAdmin from "./pages/admin/ProductList";
import Category from "./pages/admin/Category";
import AdminOrders from "./pages/admin/AdminOrders";
import Products from "./pages/Products";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/health" element={<Health />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <RouteProtector
                            roles={["admin", "visitor"]}
                            redirectionUrl="/"
                        >
                            <AdminLayout />
                        </RouteProtector>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="users/list" element={<Users />}></Route>
                    <Route
                        path="products/list"
                        element={<ProductListAdmin />}
                    ></Route>
                    <Route
                        path="products/create"
                        element={<CreateProduct />}
                    ></Route>
                    <Route
                        path="products/update/:id"
                        element={<UpdateProduct />}
                    ></Route>
                    <Route
                        path="products/category"
                        element={<Category />}
                    ></Route>
                    <Route path="orders" element={<AdminOrders />}></Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
