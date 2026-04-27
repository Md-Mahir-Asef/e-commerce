import { useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NumberSpinner from "../../components/ui/NumberSpinner";
import { Users as UsersIcon } from "lucide-react";

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

    // Format header names to be more readable
    const formatHeader = (header: string) => {
        return header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const colWidth = `${100 / tableHeaders.length}%`;
    const headerCells = tableHeaders.map((tableHeader, i) => (
        <th
            key={i}
            className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
            style={{ width: colWidth }}
        >
            {formatHeader(tableHeader)}
        </th>
    ));

    const tableRows = users.map((user, i) => {
        return (
            <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                {tableHeaders.map((key) => (
                    <td
                        key={key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
                    >
                        {String(user[key])}
                    </td>
                ))}
            </tr>
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <UsersIcon
                            className="text-gray-400 dark:text-gray-500"
                            size={32}
                        />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Users Management
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage and view all registered users in the system
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Users
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {usrCount}
                                </p>
                            </div>
                            <UsersIcon
                                className="text-blue-600 dark:text-blue-400"
                                size={24}
                            />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Current Page
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {page}
                                </p>
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                Page
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Rows Per Page
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {rows}
                                </p>
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                Rows
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {users.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>{headerCells}</tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {tableRows}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <UsersIcon
                                className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
                                size={48}
                            />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No users found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                There are no users to display at the moment.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination and Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Results Info */}
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                <UsersIcon
                                    className="text-blue-600 dark:text-blue-400"
                                    size={20}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Showing {users.length} of {usrCount} users
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Page {page} of {Math.ceil(usrCount / rows)}
                                </p>
                            </div>
                        </div>

                        {/* Pagination */}
                        <Stack spacing={2} className="flex items-center">
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
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                size="medium"
                            />
                        </Stack>

                        {/* Rows Per Page Control */}
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Rows:
                            </label>
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
                                    className="bg-white dark:bg-gray-600"
                                />
                            </Box>
                        </div>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Total: {usrCount}
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Last updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
