import { useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NumberSpinner from "../../components/ui/NumberSpinner";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [usrCount, setUsrCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(5);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/users/${page}/${rows}`,
                    { withCredentials: true },
                );
                await setUsers(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        const getNumOfUsr = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/users/count`,
                    { withCredentials: true },
                );
                await setUsrCount(response.data.data.numOfUsr);
            } catch (err) {
                console.log(err);
            }
        };
        loadUsers();
        getNumOfUsr();
    }, [page, rows]);

    const tableHeaders = users.length ? Object.keys(users[0]) : [];

    const colWidth = `${100 / tableHeaders.length}%`;
    const headerCells = tableHeaders.map((tableHeader, i) => (
        <th
            key={i}
            className="p-2 border-x-2 border-x-black h-15"
            style={{ width: colWidth }}
        >
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
                    <td
                        key={key}
                        className="p-2 border-x-2 border-x-black h-15"
                    >
                        {String(user[key])}
                    </td>
                ))}
            </tr>
        );
    });

    return (
        <div className="mr-2">
            <h1 className="text-3xl mb-3.5 mr-2">Users</h1>
            <table className="rounded mr-2 w-full">
                <thead>
                    <tr className="border border-black border-y-2 border-b-3">
                        {headerCells}
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between px-2 gap-6">
                <div className="flex items-center mt-5">
                    Total Users: {usrCount}
                </div>
                <Stack spacing={2} className="flex items-center mt-5">
                    <Pagination
                        count={Math.ceil(usrCount / rows)}
                        page={page}
                        onChange={(
                            event: React.ChangeEvent<unknown>,
                            value: number,
                        ) => {
                            event.preventDefault();
                            setPage(value);
                        }}
                        color="primary"
                    />
                </Stack>
                <div className="flex items-center gap-3">
                    <p className="whitespace-nowrap mt-5">Users Per Page:</p>
                    <Box>
                        <NumberSpinner
                            min={1}
                            max={usrCount}
                            size="small"
                            defaultValue={rows}
                            value={rows}
                            onValueChange={(val) => {
                                setRows(Number(val));
                            }}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}
