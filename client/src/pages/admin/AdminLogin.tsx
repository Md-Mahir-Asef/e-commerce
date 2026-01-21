import Header from "../../components/Header";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginUserDataSchema } from "@/lib/zodSchemas";
import axios from "axios";
import { config } from "../../config/config";
import { toast } from "sonner";
import { ZodError } from "zod/v4";
import type { MouseEvent } from "react";

export default function AdminLogin() {
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
                `${config.VITE_SERVER_BASE_URL}/admin/login`,
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
            navigate("/admin/dashboard");
            toast.success(
                `Sir ${response.data.data.user_name}, you are welcome to E-commerce. As an admin`,
            );
        } catch (err) {
            if (err instanceof ZodError) {
                toast.error(JSON.parse(err.message)[0].message);
            } else {
                toast.error("Authentication failed! Not an admin.");
                navigate("/");
            }
            console.log("Not an Admin.");
        }
    };

    return (
        <>
            <Header />
            <section className="flex flex-col justify-center items-center">
                <div className="items-start">
                    <h1 className="text-5xl font-semibold mt-15 text-center">
                        Login as admin
                    </h1>
                    <h3 className="text-center">Welcome back Sir.</h3>
                    <form className="flex flex-col mt-10">
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
                </div>
            </section>
        </>
    );
}
