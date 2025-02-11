import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const MOCK_CREDENTIALS = {
  username: "admin",
  password: "password123",
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  // Read persistence when loading the application
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (storedAuth) setIsAuthenticated(true);
  }, []);

  // Handle authentication
  const handleLogin = () => {
    if (
      username === MOCK_CREDENTIALS.username &&
      password === MOCK_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      resetSessionTimeout();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    clearTimeout(timeoutId);
  };

  // Reiniciar el temporizador de sesión
  const resetSessionTimeout = useCallback(() => {
    clearTimeout(timeoutId); // Limpia el temporizador existente
    const id = setTimeout(() => {
      handleLogout();
      alert("Sesión cerrada por inactividad.");
    }, 60000); // 1 minuto de inactividad
    setTimeoutId(id);
  }, [timeoutId]);

  // Escuchar interacción del usuario
  useEffect(() => {
    if (isAuthenticated) {
      const handleUserActivity = () => resetSessionTimeout();
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);

      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("keypress", handleUserActivity);
      };
    }
  }, [isAuthenticated, resetSessionTimeout]);

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div>
          <h1>Iniciar Sesión</h1>
          <div>
            <label htmlFor="username">Usuario:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Bienvenido, {MOCK_CREDENTIALS.username}!</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default App;
