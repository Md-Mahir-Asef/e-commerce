import Header from "../components/Header";
import { Eye, EyeClosed, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [show, setShow] = useState(false);
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
                            src="/google_logo.png"
                            alt="Google"
                            className="pr-3 w-8 h-8 object-contain"
                        />
                        <p className="pt-[4px] font-medium">
                            Login with Google
                        </p>
                    </button>
                    <div className="flex items-center my-6 w-full">
                        <div className="flex-grow border-b border-gray-300/50"></div>
                        <span className="mx-4 text-gray-500 text-sm">
                            or Login with Email
                        </span>
                        <div className="flex-grow border-b border-gray-300/50"></div>
                    </div>
                    <form action="post" className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-500 border-opacity-50 rounded-sm p-1 outline-none"
                            />
                        </div>
                        <div className="flex flex-col mt-2 relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
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
        </>
    );
}
