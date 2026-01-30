import { useState } from "react";
import "./Hinzufuegen.css";
import { uploadReiseziel } from "../services/reiseziele-service";

export default function Hinzufügen() {
  const [ort, setOrt] = useState("");
  const [jahr, setJahr] = useState("");
  const [highlights, setHighlights] = useState("");
  const [bildDatei, setBildDatei] = useState(null);
  const [kategorie, setKategorie] = useState("");
  const [message, setMessage] = useState("");

  const kategorien = [
    "Städtetrip",
    "Strandurlaub",
    "Abenteuer",
    "Natur",
    "Historisch",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!bildDatei) {
      setMessage("Bitte ein Bild auswählen.");
      return;
    }

    const formData = new FormData();
    formData.append("ort", ort.trim());
    formData.append("jahr", jahr.trim());
    formData.append("highlights", highlights.trim());
    formData.append("kategorie", kategorie.trim());
    formData.append("bild", bildDatei); // ⚠️ falls Backend "file" erwartet → ändern!

    try {
      const res = await uploadReiseziel(formData);

      console.log("Upload erfolgreich:", res);

      setMessage("Reiseziel erfolgreich hinzugefügt!");
      setOrt("");
      setJahr("");
      setHighlights("");
      setKategorie("");
      setBildDatei(null);
    } catch (err) {
      console.error("Upload-Fehler:", err);

      const errorMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        err.message;

      setMessage("Fehler beim Speichern: " + errorMsg);
    }
  };

  return (
    <div className="form-container">
      <h2>Neues Reiseziel hinzufügen</h2>

      <form onSubmit={handleSubmit} className="reise-form">
        <label>
          Ort:
          <input
            type="text"
            value={ort}
            onChange={(e) => setOrt(e.target.value)}
            required
          />
        </label>

        <label>
          Jahr:
          <input
            type="text"
            value={jahr}
            onChange={(e) => setJahr(e.target.value)}
            required
          />
        </label>

        <label>
          Highlights:
          <input
            type="text"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            required
          />
        </label>

        <label>
          Kategorie:
          <select
            value={kategorie}
            onChange={(e) => setKategorie(e.target.value)}
            required
          >
            <option value="">-- bitte wählen --</option>
            {kategorien.map((k, i) => (
              <option key={i} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label>
          Foto:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBildDatei(e.target.files[0])}
            required
          />
        </label>

        <button type="submit">Abspeichern</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
