import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Weltkarte from "../components/Weltkarte";

// Diese Seite zeigt die Weltkarte mit den Reisezielen an
// und lädt die Reisedaten vom Server.
export default function WeltkartePage() {
    const [reiseziele, setReiseziele] = useState([]);

    // useEffect zum Laden der Reisedaten vom Server
    // beim ersten Rendern der Komponente.
    useEffect(() => {
        fetch("http://localhost:8080/reiseziele/")
            .then((res) => {
                if (!res.ok) throw new Error("Fehlerhafte Serverantwort");
                return res.json();
            })
            .then((data) => {
                console.log("Geladene Daten:", data);
                setReiseziele(data);
            })
            .catch((err) => console.error("Fehler beim Laden:", err));
    }, []);

    // Rendern der Navigation und der Weltkarte mit den Reisezielen
    return (
        <div>
            <Weltkarte reiseziele={reiseziele} />
        </div>
    );
}
