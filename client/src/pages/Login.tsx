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
            <section className="flex flex-col justify-center items-center">
                <div className="items-start">
                    <h1 className="text-5xl font-semibold mt-15">Login</h1>
                    <h3>Hi, Welcome back. 👋</h3>
                    <button
                        title="This feature is not available."
                        className="text-md flex flex-row py-1 px-20 border mt-5 rounded-sm border-gray-300 cursor-pointer"
                    >
                        <img
                            src="images/google_logo.png"
                            alt="Google"
                            className="pr-3 w-8 h-8 object-contain"
                        />
                        <p className="pt-1 font-medium">Login with Google</p>
                    </button>
                    <div className="flex items-center my-6 w-full">
                        <div className="grow border-b border-gray-300/50"></div>
                        <span className="mx-4 text-gray-500 text-sm">
                            or Login with Email
                        </span>
                        <div className="grow border-b border-gray-300/50"></div>
                    </div>
                    <form className="flex flex-col">
                        <div className="flex flex-col">
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
                                type={show ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                            {show ? (
                                <Eye
                                    className="absolute right-2 top-7.25"
                                    onClick={() => setShow(!show)}
                                />
                            ) : (
                                <EyeClosed
                                    className="absolute right-2 top-7.25"
                                    onClick={() => setShow(!show)}
                                />
                            )}
                        </div>
                        <Link
                            to={"/forgot-pass"}
                            className="text-blue-700 font-medium focus:text-blue-900 text-right pt-2"
                        >
                            Forgot password?
                        </Link>
                        <button
                            type="submit"
                            onClick={submitLogin}
                            className="bg-blue-800 text-white p-3 mt-6 rounded-lg cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                    <h4 className="mt-2 flex flex-row justify-center items-center">
                        Not registered yet?{" "}
                        <Link
                            to={"/register"}
                            className="text-blue-700 focus:text-blue-900 flex flex-row"
                        >
                            Create an account <ArrowUpRight />
                        </Link>
                    </h4>
                </div>
            </section>
            <Footer />
        </>
    );
}
