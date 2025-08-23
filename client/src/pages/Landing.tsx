import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

export default function Landing() {
    const [text, setText] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(
                `${config.VITE_SERVER_BASE_URL}/ping`,
                {
                    withCredentials: true,
                }
            );
            console.log("Data: ", data.data.message);
            setText(data.data.message);
        };
        fetchData();
    }, []);
    return (
        <>
            <TopHeader />
            <Header />
            <h1 className="text-8xl text-red-800 w-full mx-auto">
                {text ? text : "Not connected to server."}
            </h1>
        </>
    );
}
