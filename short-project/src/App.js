import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const MOCK_CREDENTIALS = [
  { username: "admin", password: "password123" },
  { username: "JordyRodriguez", password: "123456" },
  { username: "CarlosBravo", password: "qwerty" },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef(null); ;

  // Read persistence when loading the application
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("currentUser"));
    if (storedAuth) {
      setIsAuthenticated(true);
      setCurrentUser(storedAuth);
      resetSessionTimeout();
    }
  }, []);

  // Handle authentication
  const handleLogin = () => {
    const user = MOCK_CREDENTIALS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      resetSessionTimeout();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(60);
  };

  // Restart the session timer
  const resetSessionTimeout = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(60);
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        
        if (prev === 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          handleLogout();
          alert('Sesión cerrada por inactividad.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Listen to user interaction
  useEffect(() => {
    if (isAuthenticated) {
      const handleUserActivity = () => resetSessionTimeout();
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);

      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("keypress", handleUserActivity);
        clearInterval(intervalRef.current);
      };
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="App">
        <h1>Iniciar Sesión</h1>
        <div>
          <div className="inputs-container">
            <div className="input">
              <label htmlFor="username">Usuario:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Bienvenido, {currentUser.username}!</h1>
      <p>
        Tiempo antes de cierre automático: <strong>{timeLeft}</strong> segundos
      </p>
      <button className="btn" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default App;
