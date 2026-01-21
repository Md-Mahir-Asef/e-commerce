import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

export default function Health() {
    const [data, setData] = useState<{
        uptime: string;
        timeStamp: string;
        availability: {
            database: {
                size: string;
                available: boolean;
            };
        };
    }>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/health`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("Connected to Server.", response);
                if (!response.data.data) {
                    throw new Error(
                        "Can't receive health status from the server."
                    );
                }
                setData(response.data.data);
            } catch (err) {
                const error = err instanceof Error ? err.message : err;
                console.log("Can't connect to server. Error:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Header />
            <div className="flex flex-col items-center mt-20">
                <h1 className="text-8xl text-red-800">
                    {data ? "Connected to Server." : "Not connected to server."}
                </h1>
                {data ? (
                    <div className="flex flex-row justify-center mt-20 gap-30">
                        <div className="flex flex-col text-4xl text-green-600">
                            <h3>Uptime: </h3>
                            <h3>Time Stamp: </h3>
                            <h3>Database Size: </h3>
                            <h3>Server URL: </h3>
                        </div>
                        <div className="flex flex-col text-4xl text-green-600">
                            <h3>{data.uptime}</h3>
                            <h3>{data.timeStamp}</h3>
                            <h3>{data.availability.database.size}</h3>
                            <h3>{config.VITE_SERVER_BASE_URL}</h3>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row justify-center mt-20 gap-30">
                        <div className="flex flex-col text-4xl text-green-600">
                            <h3>Server URL: </h3>
                        </div>
                        <div className="flex flex-col text-4xl text-green-600">
                            <h3>{config.VITE_SERVER_BASE_URL}</h3>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
