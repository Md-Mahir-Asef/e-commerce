import Header from "../components/Header";
import { Eye, EyeClosed, ArrowUpRight, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginUserDataSchema } from "@/lib/zodSchemas";
import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";
import { ZodError } from "zod/v4";
import type { MouseEvent } from "react";
import Footer from "@/components/Footer";

export default function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = async (event: MouseEvent) => {
        try {
            event.preventDefault();
            const data = LoginUserDataSchema.parse({
                email,
                password,
            });
            const response = await axios.post(
                `${config.VITE_SERVER_BASE_URL}/auth/login`,
                {
                    data: {
                        email: data.email,
                        password: data.password,
                    },
                },
                {
                    withCredentials: true,
                },
            );
            navigate("/");
            toast.success(
                `Sir ${response.data.data.user_name}, you are welcome to Robobazar.`,
            );
        } catch (err) {
            if (err instanceof ZodError) {
                toast.error(JSON.parse(err.message)[0].message);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center py-16">
                        <LogIn
                            className="mx-auto text-gray-400 dark:text-gray-500 mb-6"
                            size={64}
                        />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Login
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Hi, Welcome back. 👋
                        </p>
                        <form className="space-y-6 text-left">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {show ? (
                                            <Eye size={20} />
                                        ) : (
                                            <EyeClosed size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <Link
                                    to="/forgot-pass"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                onClick={submitLogin}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                Not registered yet?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors"
                                >
                                    Create an account
                                    <ArrowUpRight size={16} />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
