import React from "react";
import "./Reisebox.css";

export default function Reisebox({ id, ort, jahr, highlights, kategorie, bildPfad, onDelete }) {
  return (
    <div className="reise-box">
      {/* Bild */}
      <div className="bild-container">
        {bildPfad && (
          <img
            src={`http://localhost:8080${bildPfad}`}
            alt={ort}
          />
        )}
      </div>

      {/* Textbereich */}
      <div className="info-zeile">
          <span className="ort">{ort}</span>
          <span className="jahr">{jahr}</span>
        </div>
        <div className="highlight">{`Highlights: ${highlights}`}</div>
        <div className="kategorie">{`Kategorie: ${kategorie}`}</div>

      {/* Löschen */}
      <button className="delete-button" onClick={() => onDelete(id)}>
        Reise löschen
      </button>
    </div>
  );
}
