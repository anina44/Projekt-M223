import { useEffect, useState, useContext } from "react";
import Weltkarte from "../components/Weltkarte";
import api from "../services/api-client"; // 👈 wichtig
import { AuthContext } from "../auth/AuthContext";

export default function WeltkartePage() {
    const [reiseziel, setReiseziel] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        api
            .get("/api/reiseziel") // 👈 gleicher Endpoint wie Home
            .then((res) => {
                const data = res.data;
                console.log("Geladene Daten (Weltkarte):", data);
                setReiseziel(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error(
                    "Fehler beim Laden (Weltkarte):",
                    err?.response?.status,
                    err?.response?.data || err.message
                );
                setReiseziel([]);
            });
    }, []);

    return (
        <div>
            <Weltkarte reiseziel={reiseziel} />
        </div>
    );
}
