import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <Header />
            <div>User ID: {id}</div>
        </>
    );
}
