import { useState, useEffect } from "react";
import Reisebox from "../components/Reisebox";
import api from "../services/api-client";

export default function Reiseziele() {
  const [reiseziele, setReiseziele] = useState([]);

  useEffect(() => {
    api.get("/api/reiseziele")
      .then((res) => {
        const data = res.data;
        setReiseziele(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setReiseziele([]);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/reiseziele/${id}`);
      setReiseziele((prev) => prev.filter((ziel) => ziel.id !== id));
    } catch (err) {
      console.error("Löschen fehlgeschlagen:", err);
    }
  };

  return (
    <div>
      <h2>Alle Reiseziele (Admin-Verwaltung):</h2>
      <div className="reise-container">
        {reiseziele.length === 0 ? (
            <p>Keine Reiseziele vorhanden.</p>
        ) : (
            reiseziele.map((ziel, i) => (
                <Reisebox
                    key={ziel.id || i}
                    id={ziel.id}
                    ort={ziel.ort}
                    jahr={ziel.jahr}
                    highlights={ziel.highlights}
                    kategorie={ziel.kategorie}
                    bildPfad={ziel.bildPfad}
                    onDelete={handleDelete}
                />
            ))
        )}
      </div>
    </div>
  );
}