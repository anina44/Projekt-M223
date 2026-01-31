import React from "react";
import "./Reisebox.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// macht aus bildPfad immer eine funktionierende URL
function buildImageUrl(bildPfad) {
  if (!bildPfad) return null;

  // falls backend bereits volle url liefert
  if (bildPfad.startsWith("http://") || bildPfad.startsWith("https://")) {
    return bildPfad;
  }

  // falls backend "/uploads/xyz.jpg" liefert
  if (bildPfad.startsWith("/")) {
    return `${API_BASE}${bildPfad}`;
  }

  // falls backend nur "xyz.jpg" liefert
  return `${API_BASE}/uploads/${bildPfad}`;
}

// macht aus kategorie (objekt oder string) einen schönen text
function getKategorieText(kategorie) {
  if (!kategorie) return "Keine";

  // wenn es ein Objekt ist (z.B. { id, name } oder { bezeichnung })
  if (typeof kategorie === "object") {
    return (
      kategorie.name ??
      kategorie.bezeichnung ??
      kategorie.titel ??
      kategorie.value ??
      "Unbekannt"
    );
  }

  // wenn es schon ein string ist
  return String(kategorie);
}

export default function Reisebox({ id, ort, jahr, highlights, kategorie, bildPfad, onDelete }) {
  const imageSrc = buildImageUrl(bildPfad);
  console.log("Reisebox:", { id, ort, bildPfad });
  const kategorieText = getKategorieText(kategorie);

  return (
    <div className="reise-box">
      {/* Bild */}
      <div className="bild-container">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={ort}
            onError={(e) => {
              // falls Bild fehlt, einfach ausblenden (damit nicht kaputt aussieht)
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>

      {/* Textbereich */}
      <div className="info-zeile">
        <span className="ort">{ort}</span>
        <span className="jahr">{jahr}</span>
      </div>

      <div className="highlight">Highlights: {highlights}</div>
      <div className="kategorie">Kategorie: {kategorieText}</div>

      {/* Löschen */}
      <button className="delete-button" onClick={() => onDelete(id)}>
        Reise löschen
      </button>
    </div>
  );
}
