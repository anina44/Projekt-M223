import { useState, useEffect } from "react"
import Reisebox from "../components/Reisebox";


import api from "../services/api-client"; // Pfad anpassen!

export default function Home() {
    const [reiseziele, setReiseziele] = useState([]);
    const [sortierung, setSortierung] = useState("standard");
    const [kategorie, setKategorie] = useState("");

    useEffect(() => {
        api.get("/api/reiseziele")
            .then((res) => {
                const data = res.data;
                setReiseziele(Array.isArray(data) ? data : []);
                console.log("Geladene Reiseziele:", data);
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

  // Alle Kategorien für das Dropdown ermitteln
  const kategorien = Array.from(
  new Set(reiseziele.map(ziel => ziel.kategorie?.name).filter(Boolean))
  );

  // Nach Kategorie filtern
  const gefilterteReiseziele = kategorie
    ? reiseziele.filter(ziel => ziel.kategorie?.name === kategorie)
    : reiseziele;

    // Sortieren der gefilterten Reiseziele
const sortierteReiseziele = [...gefilterteReiseziele].sort((a, b) => {
  if (sortierung === "jahr aufsteigend") return a.jahr.localeCompare(b.jahr);
  if (sortierung === "jahr absteigend") return b.jahr.localeCompare(a.jahr);
  if (sortierung === "name") return a.ort.localeCompare(b.ort);
  return 0;
});

// Debugging-Ausgabe
  return (
    <div>
      <h2 className="MeineReisen">Meine Reisen:</h2>

      <label>
        Sortieren nach:{" "}
        <select value={sortierung} onChange={(e) => setSortierung(e.target.value)}>
          <option value="standard">Keine Sortierung</option>
          <option value="jahr aufsteigend">Jahr aufsteigend</option>
          <option value="jahr absteigend">Jahr absteigend</option>
          <option value="name">Ort (A-Z)</option>
        </select>
      </label>

      <label>
        Kategorie:{" "}
        <select value={kategorie} onChange={e => setKategorie(e.target.value)}>
  <option value="">Alle</option>
  <option value="Städtetrip">Städtetrip</option>
  <option value="Strandurlaub">Strandurlaub</option>
  <option value="Abenteuer">Abenteuer</option>
  <option value="Natur">Natur</option>
  <option value="Historisch">Historisch</option>
  {kategorien.map((k, i) => (
    <option key={i} value={k}>{k}</option>
  ))}
</select>
      </label>


        <div className="reise-container">
            {sortierteReiseziele.map((ziel, i) => (
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
            ))}
        </div>
    </div>
  );
}