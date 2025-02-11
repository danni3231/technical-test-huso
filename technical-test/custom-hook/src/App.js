import React, { useState, useEffect } from "react";
import useDebouncedValue from "./Components/useDebouncedValue";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [delay, setDelay] = useState(1000);

  const debouncedValue = useDebouncedValue(value, delay); // 500ms delay

  useEffect(() => {
    // Simulate a search or api call
    if (debouncedValue) {
      console.log("Realizando búsqueda:", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="App">
    <h2>Custom hook</h2>
      <div className="inputs-container">
        <div className="input">
          <label>Valor del texto</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Escribe algo..."
          />
        </div>

        <div className="input">
          <label>Tiempo de espera (ms)</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            placeholder="Ingresa el delay en ms"
          />
        </div>
      </div>

      <div className="result">
        <p><b>Valor inmediato:</b> {value}</p>
        <p><b>Tiempo de espera:</b> {delay} ms</p>
        <p><b>Valor debounced:</b> {debouncedValue}</p>
      </div>
    </div>
  );
}

/*function App() {
  const [value, setValue] = useState("");
  const [delay, setDelay] = useState(1000);

  const [appliedValue, setAppliedValue] = useState(""); // Valor aplicado al debounce
  const [appliedDelay, setAppliedDelay] = useState(delay); // Delay aplicado al debounce

  const debouncedValue = useDebouncedValue(appliedValue, appliedDelay); // 500ms delay

  useEffect(() => {
    // Simulate a search or api call
    if (debouncedValue) {
      console.log("Realizando búsqueda:", debouncedValue);
    }
  }, [debouncedValue]);

  const applyDebounceSettings = () => {
    setAppliedValue(value);
    setAppliedDelay(delay);
  };

  return (
    <div className="App">
      <label>Valor del texto</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe algo..."
      />
      <label>Tiempo de espera (ms)</label>
      <input
        type="number"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
        placeholder="Ingresa el delay en ms"
      />
      <button onClick={applyDebounceSettings}>Aplicar debounce</button>
      <p>Valor inmediato: {appliedValue}</p>
      <p>Tiempo de espera: {appliedDelay} ms</p>
      <p>Valor debounced: {debouncedValue}</p>
      
    </div>
  );
}*/

export default App;
