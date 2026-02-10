import Header from "../components/Header";
import { Eye, EyeClosed, ArrowUpRight } from "lucide-react";
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
                `Sir ${response.data.data.user.user_name}, you are welcome to E-commerce.`,
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
            <section className="flex flex-col justify-center items-center min-h-screen px-3 sm:px-4 md:px-6">
                <div className="items-start w-full max-w-sm sm:max-w-md">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-8 sm:mt-10 md:mt-15">
                        Register
                    </h1>
                    <h3 className="text-sm sm:text-base">
                        Hi, Welcome to E-commerce. 👋
                    </h3>
                    <button
                        title="This feature is not available."
                        className="text-sm sm:text-base flex flex-row py-2 sm:py-3 px-4 sm:px-6 md:px-20 border mt-4 sm:mt-5 rounded-sm border-gray-300 cursor-pointer w-full"
                    >
                        <img
                            src="/images/google_logo.png"
                            alt="Google"
                            className="pr-3 w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        />
                        <p className="pt-0.5 sm:pt-1 font-medium">
                            Register with Google
                        </p>
                    </button>
                    <div className="flex items-center my-4 sm:my-6 w-full">
                        <div className="grow border-b border-gray-300/50"></div>
                        <span className="mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm">
                            or Register with Email
                        </span>
                        <div className="grow border-b border-gray-300/50"></div>
                    </div>
                    <form className="flex flex-col w-full">
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="name"
                                className="text-sm sm:text-base mb-1"
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
                                className="border border-gray-500 border-opacity-50 rounded-sm p-2 sm:p-3 outline-none w-full text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="email"
                                className="text-sm sm:text-base mb-1"
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
                                className="border border-gray-500 border-opacity-50 rounded-sm p-2 sm:p-3 outline-none w-full text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col mb-3 relative">
                            <label
                                htmlFor="password"
                                className="text-sm sm:text-base mb-1"
                            >
                                Password
                            </label>
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-2 sm:p-3 outline-none w-full text-sm sm:text-base pr-10"
                            />
                            {showPass ? (
                                <Eye
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() => setShowPass(!showPass)}
                                    size={16}
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() => setShowPass(!showPass)}
                                    size={16}
                                />
                            )}
                        </div>
                        <div className="flex flex-col mb-3 relative">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-2 sm:p-3 outline-none w-full text-sm sm:text-base pr-10"
                            />
                            {showConfirmPass ? (
                                <Eye
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                    size={16}
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                    size={16}
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-800 text-white p-2 sm:p-3 mt-4 sm:mt-6 rounded-lg cursor-pointer w-full text-sm sm:text-base font-medium"
                            onClick={submitRegistration}
                        >
                            Register
                        </button>
                    </form>
                    <h4 className="mt-3 sm:mt-4 flex flex-row justify-center items-center text-sm sm:text-base">
                        Already has an account?{" "}
                        <Link
                            to={"/login"}
                            className="text-blue-700 focus:text-blue-900 flex flex-row ml-1"
                        >
                            Login <ArrowUpRight size={16} />
                        </Link>
                    </h4>
                </div>
            </section>
            <Footer />
        </>
    );
}
