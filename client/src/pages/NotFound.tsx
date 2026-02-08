import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
    return (
        <>
            <Header />
            <section className="flex justify-center items-center flex-col">
                <div className="mt-50">
                    <h1 className="text-9xl text-red-600">404 Error</h1>
                    <h1 className="text-5xl pl-20 pb-20">Page not found</h1>
                    <p className="flex flex-row text-3xl">
                        This page is not available.{" "}
                        <Link
                            to={"/home"}
                            className="cursor-pointer text-blue-700 hover:text-blue-900 hover:underline flex flex-row"
                        >
                            Go to Home{" "}
                            <ArrowUpRight
                                className=""
                                width={30}
                                height={30}
                            />{" "}
                        </Link>
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}
