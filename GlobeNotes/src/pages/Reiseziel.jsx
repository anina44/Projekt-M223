import { useState } from 'react';

export default function Reiseziel() {
  const [reiseziel, setReiseziel] = useState(["Paris", "Berlin", "New York"]);
  const [newreiseziel, setNewReiseziel] = useState('');

  function handleInputChange(event) {
    setNewReiseziel(event.target.value);
  }

  function addReiseziel() {

    if(newreiseziel.trim() !== '') {
    setReiseziel(t => [...reiseziel, newreiseziel]);
    setNewReiseziel('');
    }
  }

  function deleteReiseziel(index) {
    
    const updatedReiseziel = reiseziel.filter((element, i) => i !== index);
    setReiseziel(updatedReiseziel); 
  }  

  function moveReisezielUp(index) {
    if(index > 0) {
      const updatedReiseziel =  [...reiseziel];
      [updatedReiseziel[index], updatedReiseziel[index - 1]] = 
      [updatedReiseziel[index - 1], updatedReiseziel[index]];
      setReiseziel(updatedReiseziel);
    }
  }

  function moveReisezielDown(index) {
    if(index < reiseziel.length - 1) {
          const updatedReiseziel =  [...reiseziel];
          [updatedReiseziel[index], updatedReiseziel[index + 1]] = 
          [updatedReiseziel[index + 1], updatedReiseziel[index]];
          setReiseziel(updatedReiseziel);
        }
  } 

  return (
    <div className="Reiseziel">
      <header className="Reiseziel-header">
        <h3>Füge deine Wunsch Reiseziel ein</h3>
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
          {reiseziel.map((reiseziel, index) =>
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