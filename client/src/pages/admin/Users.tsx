import { useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { useState } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/users`,
                    { withCredentials: true },
                );
                await setUsers(response.data.data);
                console.log(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        loadUsers();
    }, []);

    const tableHeaders = users.length ? Object.keys(users[0]) : [];

    const headerCells = tableHeaders.map((tableHeader, i) => (
        <th key={i} className="p-2 border-x-2 border-x-black">
            {tableHeader}
        </th>
    ));

    const tableRows = users.map((user, i) => {
        return (
            <tr
                key={i}
                className="border border-black border-y-2 border-b-3 border-x-black"
            >
                {tableHeaders.map((key) => (
                    <td key={key} className="p-2 border-x-2 border-x-black">
                        {String(user[key])}
                    </td>
                ))}
            </tr>
        );
    });

    return (
        <>
            <h1 className="text-3xl mb-3.5">Users</h1>
            <table className="rounded">
                <thead>
                    <tr className="border border-black border-y-2 border-b-3">
                        {headerCells}
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            {/* Pagination */}
            <div></div>
        </>
    );
}
