import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Project from "./pages/Project";
import Employee from "./pages/Employee";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/customers"
            element={<Customer />}
          />

          <Route
            path="/projects"
            element={<Project />}
          />

          <Route
            path="/employees"
            element={<Employee />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;