import LoginPage from "./component/LoginPage.jsx";
import SignupPage from "./component/SignupPage.jsx";
import Dashboard from "./component/Dashboard.jsx";
import PostWritePage from "./component/PostWritePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postwrite" element={<PostWritePage />} />
      </Routes>
    </Router>
  );
}

export default App;
