import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { config } from "../config/config";

export default function Landing() {
    // const [text, setText] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${config.serverBaseURL}api/test`);
            console.log("Data: ", data);
            // setText(data.data.data.message);
        };
        fetchData();
    }, []);
    return (
        <>
            <TopHeader />
            <Header />
            {/* <h1 className="text-9xl text-red-800">{text}</h1> */}
        </>
    );
}
