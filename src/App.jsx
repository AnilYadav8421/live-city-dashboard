import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashbord.jsx"
import Countries from "./pages/Countries.jsx"
import LiveNotes from "./pages/LiveNotes.jsx"
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/countries"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Countries />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/live-notes"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <LiveNotes />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;