import { Link } from "react-router-dom";
import { FaUsers, FaProjectDiagram, FaUserTie } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    Project Management System
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link
                        className="nav-link d-flex align-items-center"
                        to="/customers"
                    >
                        <FaUsers className="me-2" />
                        Customers
                    </Link>

                    <Link
                        className="nav-link d-flex align-items-center"
                        to="/projects"
                    >
                        <FaProjectDiagram className="me-2" />
                        Projects
                    </Link>

                    <Link
                        className="nav-link d-flex align-items-center"
                        to="/employees"
                    >
                        <FaUserTie className="me-2" />
                        Employees
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;