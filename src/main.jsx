import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Container from "./components/Container";
import LoginForm from "./components/LoginForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Result from "./components/Result.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Container>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  </StrictMode>
);
