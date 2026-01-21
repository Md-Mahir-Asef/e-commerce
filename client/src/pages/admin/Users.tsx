// import { useEffect } from "react";
// import axios from "axios";
// import { config } from "@/config/config";
import type { ReactNode } from "react";
import { useState } from "react";

type User = {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  created_at: string;
  role: string;
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     const loadUsers = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${config.VITE_SERVER_BASE_URL}/auth/users`,
    //                 { withCredentials: true },
    //             );
    //             setUsers(response.data.data);
    //             console.log(response.data.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     loadUsers();
    // }, []);

    setUsers([{
      user_id: "e66d2f45-6b06-472d-a83f-249c3e4c320d",
      user_name: "Md. Mahir Asef",
      email: "mahir@asef.ecom",
      password: "$2b$10$78OhIEYavYzifQ9Hys65guvo61NKL1Kc5r5Os9Pxzm7ezbI/AL5HW",
      created_at: "2026-01-21T04:38:50.256Z",
      role: "admin"
    },
    {
      user_id: "b8236ff7-8e6a-4179-9178-1a55ab1228aa",
      user_name: "admin",
      email: "admin@admin.ecom",
      password: "$2b$10$pySzUrRhxPZ4KFcdeY7CpukMoNmMvDsTvKY4FfArz9TwCGAqN099W",
      created_at: "2026-01-21T04:38:50.334Z",
      role: "visitor"
    },
    {
      user_id: "dc9ade9e-ce48-4d72-b189-5be8aa09deb6",
      user_name: "Victoria Borer",
      email: "Miss0@dark-shore.name",
      password: "naU8EYTln2gYZyA",
      created_at: "2026-01-21T04:38:50.346Z",
      role: "user"
    },
    {
      user_id: "72326ebf-5a79-42aa-8bc3-e013fa144e4d",
      user_name: "Louise Greenfelder-Gottlieb III",
      email: "Mr.1@confused-cross-contamination.net",
      password: "hMhwLvmzP1dOfKi",
      created_at: "2026-01-21T04:38:50.354Z",
      role: "user"
    },
    {
      user_id: "26144e04-ca90-4b52-9e9b-a07c5feb1cff",
      user_name: "Janis Gibson",
      email: "Mr.4@downright-bookend.net",
      password: "hdHIjDJsn9nC4S3",
      created_at: "2026-01-21T04:38:50.361Z",
      role: "user"
    },
    {
      user_id: "7f92b8b1-88e3-46b0-802e-7a25a8db69ed",
      user_name: "Violet Gutkowski",
      email: "Ms.9@simplistic-mentor.name",
      password: "DlwPtU1ZdwPBOLh",
      created_at: "2026-01-21T04:38:50.368Z",
      role: "user"
    },
    {
      user_id: "a6993cbb-95d0-4da8-9989-33e57424f908",
      user_name: "Kristin Harvey",
      email: "Miss16@profitable-pharmacopoeia.name",
      password: "YSF_nDur7d0Mdjz",
      created_at: "2026-01-21T04:38:50.374Z",
      role: "user"
    },
    {
      user_id: "1c472cd4-aab2-42d7-a002-83bc66b3e03d",
      user_name: "Marcia Legros",
      email: "Mr.25@severe-collectivization.biz",
      password: "nfKLwKmICyUmcuf",
      created_at: "2026-01-21T04:38:50.382Z",
      role: "user"
    },
    {
      user_id: "4e8d8383-41dd-4254-8849-7d4cdd1399e0",
      user_name: "Tanya Little",
      email: "Dr.36@alive-jury.org",
      password: "IoqiKpuBCDI_3V0",
      created_at: "2026-01-21T04:38:50.389Z",
      role: "user"
    },
    {
      user_id: "96121522-fa0b-4350-b4f2-506bae3ad0bd",
      user_name: "Jeanne O'Keefe",
      email: "Ms.49@normal-tributary.com",
      password: "_zsWEbnjqNOquBT",
      created_at: "2026-01-21T04:38:50.395Z",
      role: "user"
    },
    {
      user_id: "76ba6833-60c6-4d99-8930-f53ed7410dc2",
      user_name: "Joshua Kuhlman",
      email: "Dr.64@humiliating-cantaloupe.info",
      password: "4YBKGtIdDl_HKPA",
      created_at: "2026-01-21T04:38:50.401Z",
      role: "user"
    },
    {
      user_id: "810a7816-e1cc-4caa-b675-d11f0d2dd78a",
      user_name: "Theresa Donnelly",
      email: "Mrs.81@appropriate-mousse.com",
      password: "GhjQJowuM1M3z3q",
      created_at: "2026-01-21T04:38:50.406Z",
      role: "user"
    }])

    return (
        <>
            <h1 className="text-3xl">Users</h1>
            <table>
                <thead>
                    <tr>
                        {Object.keys(users[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            {Object.values(user).map((val, j) => (
                                <td key={j}>{val as ReactNode}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
