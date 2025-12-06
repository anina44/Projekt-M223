import { useState } from "react";
import "./Hinzufuegen.css";

// Diese Komponente ermöglicht es Benutzern, neue Reiseziele hinzuzufügen.
// Sie enthält ein Formular, in dem der Ort, das Jahr, Highlights, Kategorie und ein Bild hochgeladen werden können.
// Nach dem Absenden des Formulars wird eine POST-Anfrage an den Server gesendet,
// um die Daten zu speichern. Bei Erfolg wird eine Bestätigungsmeldung angezeigt.
// Bei Fehlern wird eine entsprechende Fehlermeldung angezeigt.

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
    "Historisch"
  ];

  // Funktion zum Absenden des Formulars
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ort", ort.trim());
    formData.append("jahr", jahr.trim());
    formData.append("highlights", highlights.trim());
    formData.append("bild", bildDatei);
    formData.append("kategorie", kategorie.trim());

    if (!bildDatei) {
  alert("Bitte wähle ein Bild aus!");
  return;
}

  // Sende die Daten an den Server

   try {
  const res = await fetch("http://localhost:8080/reiseziele/upload", {
    method: "POST",
    body: formData
  });

  // Überprüfe die Antwort des Servers
  if (res.ok) {
    setMessage("Reiseziel erfolgreich hinzugefügt!");
    setOrt("");
    setJahr("");
    setHighlights("");
    setBildDatei(null);
    setKategorie("");
  } else {
    const fehlertext = await res.text(); // Lies die Fehlermeldung vom Backend
    setMessage("Fehler beim Speichern: " + fehlertext);
  }
} catch (err) {
  console.error("Fehler beim Senden:", err);
  setMessage("Netzwerkfehler: " + err.message);
}

  };

// Render das Formular
  return (
    <div className="form-container">
      <h2>Neues Reise hinzufügen</h2>
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
        <br />
        <label>
          Jahr: 
          <input
            type="text"
            value={jahr}
            onChange={(e) => setJahr(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Highlights: 
          <input
            type="text"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="Kategorie">Kategorie:</label>
        <select
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
        >
          <option className="wählen" value="">-- bitte wählen --</option>
          {kategorien.map((k, i) => (
            <option key={i} value={k}>
              {k}
            </option>
          ))}
        </select>
        <br />
        <label className="foto">
          Foto: 
             <input type="file" accept="image/*" onChange={(e) => 
              setBildDatei(e.target.files[0])} />
        </label>
        <br />
        <br />
        <button type="submit">Abspeichern</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
