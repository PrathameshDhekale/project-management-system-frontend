import { useEffect, useState } from "react";
import { FaUsers, FaProjectDiagram, FaUserTie } from "react-icons/fa";

import { getCustomers } from "../services/customerService";
import ProjectService from "../services/projectService";
import EmployeeService from "../services/employeeService";

function Dashboard() {

    const [customerCount, setCustomerCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const customerResponse = await getCustomers();
            const projectResponse = await ProjectService.getAllProjects();
            const employeeResponse = await EmployeeService.getAllEmployees();

            setCustomerCount(customerResponse.data.length);
            setProjectCount(projectResponse.data.length);
            setEmployeeCount(employeeResponse.data.length);

        } catch (error) {
            console.error("Dashboard Error:", error);
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card shadow border-0 bg-primary text-white">

                        <div className="card-body text-center">

                            <FaUsers size={45} />

                            <h1 className="mt-3">
                                {customerCount}
                            </h1>

                            <h5>Total Customers</h5>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow border-0 bg-success text-white">

                        <div className="card-body text-center">

                            <FaProjectDiagram size={45} />

                            <h1 className="mt-3">
                                {projectCount}
                            </h1>

                            <h5>Total Projects</h5>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow border-0 bg-warning text-dark">

                        <div className="card-body text-center">

                            <FaUserTie size={45} />

                            <h1 className="mt-3">
                                {employeeCount}
                            </h1>

                            <h5>Total Employees</h5>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;