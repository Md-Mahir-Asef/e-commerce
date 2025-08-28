import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UtilMenu from "./UtilMenu";

export default function Header() {
    return (
        <section className="px-10 py-5 border border-transparent border-b-gray-300 flex flex-row relative">
            <Link className="flex flex-row ml-44" to={"/"}>
                <img src="/logo.png" alt="logo" width={50} height={50} />
                <h2 className="text-4xl pt-3 text-[#3BB77E] font-extrabold">
                    E-commerce
                </h2>
            </Link>
            <SearchBar />
            <UtilMenu />
        </section>
    );
}
