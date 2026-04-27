import Header from "../components/Header";
import { Eye, EyeClosed, ArrowUpRight, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";
import { RegistrationUserDataSchema } from "@/lib/zodSchemas";
import { ZodError } from "zod/v4";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Register() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const submitRegistration = async (event: MouseEvent) => {
        try {
            event.preventDefault();
            const data = RegistrationUserDataSchema.parse({
                user_name: userName,
                email,
                password,
                confirmPassword,
            });
            const response = await axios.post(
                `${config.VITE_SERVER_BASE_URL}/auth/register`,
                {
                    data: {
                        user_name: data.user_name,
                        email: data.email,
                        password: data.password,
                    },
                },
                { withCredentials: true },
            );
            console.log(response.data.data);
            navigate("/");
            toast(
                `Sir ${response.data.data.user.user_name}, you are welcome to Robobazar.`,
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
                        <UserPlus
                            className="mx-auto text-gray-400 dark:text-gray-500 mb-6"
                            size={64}
                        />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Register
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Hi, Welcome to Robobazar. 👋
                        </p>
                        <form className="space-y-6 text-left">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={userName}
                                    onChange={(event) =>
                                        setUserName(event.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
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
                                        type={showPass ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {showPass ? (
                                            <Eye size={20} />
                                        ) : (
                                            <EyeClosed size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showConfirmPass
                                                ? "text"
                                                : "password"
                                        }
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPass(!showConfirmPass)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {showConfirmPass ? (
                                            <Eye size={20} />
                                        ) : (
                                            <EyeClosed size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={submitRegistration}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                            >
                                Register
                            </button>
                        </form>
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already has an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors"
                                >
                                    Login
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
