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
            await axios.post(`${config.VITE_SERVER_BASE_URL}/auth/register`, {
                data: {
                    user_name: data.user_name,
                    email: data.email,
                    password: data.password,
                },
            });
            navigate("/");
            toast(`Sir ${data.user_name}, you are welcome to E-commerce.`);
        } catch (err) {
            if (err instanceof ZodError) {
                toast.error(JSON.parse(err.message)[0].message);
            }
        }
    };

    return (
        <>
            <Header />
            <section className="flex flex-col justify-center items-center">
                <div className="items-start">
                    <h1 className="text-5xl font-semibold mt-15">Register</h1>
                    <h3>Hi, Welcome to E-commerce. 👋</h3>
                    <button
                        title="This feature is not available."
                        className="text-md flex flex-row py-1 px-20 border mt-5 rounded-sm border-gray-300 cursor-pointer"
                    >
                        <img
                            src="/google_logo.png"
                            alt="Google"
                            className="pr-3 w-8 h-8 object-contain"
                        />
                        <p className="pt-[4px] font-medium">
                            Register with Google
                        </p>
                    </button>
                    <div className="flex items-center my-6 w-full">
                        <div className="flex-grow border-b border-gray-300/50"></div>
                        <span className="mx-4 text-gray-500 text-sm">
                            or Register with Email
                        </span>
                        <div className="flex-grow border-b border-gray-300/50"></div>
                    </div>
                    <form className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="name">Username</label>
                            <input
                                type="text"
                                id="name"
                                value={userName}
                                onChange={(event) =>
                                    setUserName(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                        </div>
                        <div className="flex flex-col mt-2 relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                            {showPass ? (
                                <Eye
                                    className="absolute right-2 top-7.25"
                                    onClick={() => setShowPass(!showPass)}
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-2 top-7.25"
                                    onClick={() => setShowPass(!showPass)}
                                />
                            )}
                        </div>
                        <div className="flex flex-col mt-2 relative">
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
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                            {showConfirmPass ? (
                                <Eye
                                    className="absolute right-2 top-7.25"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-2 top-7.25"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-800 text-white p-3 mt-6 rounded-lg cursor-pointer"
                            onClick={submitRegistration}
                        >
                            Register
                        </button>
                    </form>
                    <h4 className="mt-2 flex flex-row justify-center items-center">
                        Already has an account?{" "}
                        <Link
                            to={"/login"}
                            className="text-blue-700 focus:text-blue-900 flex flex-row"
                        >
                            Login <ArrowUpRight />
                        </Link>
                    </h4>
                </div>
            </section>
        </>
    );
}
