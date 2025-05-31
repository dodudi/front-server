import LoginPage from "./component/LoginPage.jsx";
import SignupPage from "./component/SignupPage.jsx";
import Dashboard from "./component/Dashboard.jsx";
import PostWritePage from "./component/PostWritePage.jsx";
import PostViewPage from "./component/PostViewPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postwrite"
          element={
            <ProtectedRoute>
              <PostWritePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postview"
          element={
            <ProtectedRoute>
              <PostViewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
