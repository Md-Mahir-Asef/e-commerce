import Header from "../components/Header";
import { Eye, EyeClosed, ArrowUpRight } from "lucide-react";
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
            );
            navigate("/");
            toast.success(
                `Sir ${response.data.data.user_name}, you are welcome to E-commerce.`,
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
                        Login
                    </h1>
                    <h3 className="text-sm sm:text-base">
                        Hi, Welcome back. 👋
                    </h3>
                    <button
                        title="This feature is not available."
                        className="text-sm sm:text-base flex flex-row py-2 sm:py-3 px-4 sm:px-6 md:px-20 border mt-4 sm:mt-5 rounded-sm border-gray-300 cursor-pointer w-full"
                    >
                        <img
                            src="images/google_logo.png"
                            alt="Google"
                            className="pr-3 w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        />
                        <p className="pt-0.5 sm:pt-1 font-medium">
                            Login with Google
                        </p>
                    </button>
                    <div className="flex items-center my-4 sm:my-6 w-full">
                        <div className="grow border-b border-gray-300/50"></div>
                        <span className="mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm">
                            or Login with Email
                        </span>
                        <div className="grow border-b border-gray-300/50"></div>
                    </div>
                    <form className="flex flex-col w-full">
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
                        <div className="flex flex-col mt-2 mb-3 relative">
                            <label
                                htmlFor="password"
                                className="text-sm sm:text-base mb-1"
                            >
                                Password
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-2 sm:p-3 outline-none w-full text-sm sm:text-base pr-10"
                            />
                            {show ? (
                                <Eye
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() => setShow(!show)}
                                    size={16}
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-3 top-8 sm:top-9 cursor-pointer"
                                    onClick={() => setShow(!show)}
                                    size={16}
                                />
                            )}
                        </div>
                        <Link
                            to={"/forgot-pass"}
                            className="text-blue-700 font-medium focus:text-blue-900 text-right pt-2 text-sm sm:text-base"
                        >
                            Forgot password?
                        </Link>
                        <button
                            type="submit"
                            onClick={submitLogin}
                            className="bg-blue-800 text-white p-2 sm:p-3 mt-4 sm:mt-6 rounded-lg cursor-pointer w-full text-sm sm:text-base font-medium"
                        >
                            Login
                        </button>
                    </form>
                    <h4 className="mt-3 sm:mt-4 flex flex-row justify-center items-center text-sm sm:text-base">
                        Not registered yet?{" "}
                        <Link
                            to={"/register"}
                            className="text-blue-700 focus:text-blue-900 flex flex-row ml-1"
                        >
                            Create an account <ArrowUpRight size={16} />
                        </Link>
                    </h4>
                </div>
            </section>
            <Footer />
        </>
    );
}
