import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./component/RegistrationForm";
import UserList from "./component/UserList";

function App() {
  return (
    <Router>
      {/* ✅ Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">UserApp</Link>
          <div>
            <Link className="nav-link d-inline text-white" to="/">Register</Link>
            <Link className="nav-link d-inline text-white ms-3" to="/users">User List</Link>
          </div>
        </div>
      </nav>

      {/* ✅ Page Routes */}
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
