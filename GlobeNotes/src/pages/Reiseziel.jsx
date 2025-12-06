import { useState } from 'react';

// Dieser Komponente ermöglicht es dem Benutzer, eine Liste von Reisezielen zu verwalten.
// Der Benutzer kann neue Reiseziele hinzufügen, bestehende löschen und die Reihenfolge ändern.

export default function Reiseziel() {
  const [reiseziele, setReiseziele] = useState(["Paris", "Berlin", "New York"]);
  const [newreiseziel, setNewReiseziel] = useState('');

  function handleInputChange(event) {
    setNewReiseziel(event.target.value);
  }

  function addReiseziel() {

    if(newreiseziel.trim() !== '') {
    setReiseziele(t => [...reiseziele, newreiseziel]);
    setNewReiseziel('');
    }
  }

  function deleteReiseziel(index) {
    
    const updatedReiseziel = reiseziele.filter((element, i) => i !== index);
    setReiseziele(updatedReiseziel); 
  }  

  function moveReisezielUp(index) {
    if(index > 0) {
      const updatedReiseziel =  [...reiseziele];
      [updatedReiseziel[index], updatedReiseziel[index - 1]] = 
      [updatedReiseziel[index - 1], updatedReiseziel[index]];
      setReiseziele(updatedReiseziel);
    }
  }

  function moveReisezielDown(index) {
    if(index < reiseziele.length - 1) {
          const updatedReiseziel =  [...reiseziele];
          [updatedReiseziel[index], updatedReiseziel[index + 1]] = 
          [updatedReiseziel[index + 1], updatedReiseziel[index]];
          setReiseziele(updatedReiseziel);
        }
  } 

  // Rendern der Komponente
  // Die Komponente zeigt ein Eingabefeld für neue Reiseziele, eine Liste
  return (
    <div className="Reiseziel">
      <header className="Reiseziel-header">
        <h3>Füge deine Wunsch Reiseziele ein</h3>
        <div>
          <input
            type="text"
            placeholder="Gibt ein Reiseziel ein"
            value={newreiseziel}
            onChange={handleInputChange}/>
          <button
            className="add-button"
            onClick={addReiseziel}>
            add
          </button>   
        </div>

          <div className="Reiseziel-content">
        <ol>
          {reiseziele.map((reiseziel, index) =>
            <li key={index}>
              <span className="text">{reiseziel}</span>
              <button
                className="delete-buttton"
                onClick={() => deleteReiseziel(index)}>
                Löschen
              </button>
              <button
                className="move-buttton"
                onClick={() => moveReisezielUp(index)}>
                👆
              </button>
              <button
                className="move-buttton"
                onClick={() => moveReisezielDown(index)}>
                👇
              </button>
              </li>
            )}
        </ol>
        </div>
        <hr />
      </header>

    </div>
  );
}