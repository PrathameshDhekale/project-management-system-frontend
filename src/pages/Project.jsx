import { useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
import { getCustomers } from "../services/customerService";

function Project() {

    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [project, setProject] = useState({
        projectName: "",
        description: "",
        status: "",
        customerId: ""
    });

    const [editingId, setEditingId] = useState(null);

        useEffect(() => {
        loadProjects();
        loadCustomers();
    }, []);

    const loadProjects = () => {
        ProjectService.getAllProjects()
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => console.log(error));
    };

    const loadCustomers = () => {
        getCustomers()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => console.log(error));
    };

        const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const saveOrUpdateProject = (e) => {
    e.preventDefault();

    if (editingId === null) {

        ProjectService.saveProject(project)
            .then(() => {
                loadProjects();

                setProject({
                    projectName: "",
                    description: "",
                    status: "",
                    customerId: ""
                });

            })
            .catch((error) => console.log(error));

    } else {

        ProjectService.updateProject(editingId, project)
            .then(() => {

                loadProjects();

                setEditingId(null);

                setProject({
                    projectName: "",
                    description: "",
                    status: "",
                    customerId: ""
                });

            })
            .catch((error) => console.log(error));
    }
};

const deleteProject = (id) => {

    if (window.confirm("Are you sure?")) {

        ProjectService.deleteProject(id)
            .then(() => {
                loadProjects();
            })
            .catch((error) => console.log(error));
    }
};

const editProject = (project) => {

    setEditingId(project.projectId);

    setProject({
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        customerId: project.customer.customerId
    });
};
return (
    <div className="container mt-4">

        <h2 className="text-center mb-4">Project Management</h2>

        <form onSubmit={saveOrUpdateProject}>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Project Name"
                name="projectName"
                value={project.projectName}
                onChange={handleChange}
            />

            <textarea
                className="form-control mb-3"
                placeholder="Description"
                name="description"
                value={project.description}
                onChange={handleChange}
            />

            <select
                className="form-control mb-3"
                name="status"
                value={project.status}
                onChange={handleChange}
            >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select
                className="form-control mb-3"
                name="customerId"
                value={project.customerId}
                onChange={handleChange}
            >
                <option value="">Select Customer</option>

                {customers.map((customer) => (
                    <option
                        key={customer.customerId}
                        value={customer.customerId}
                    >
                        {customer.customerName}
                    </option>
                ))}

            </select>

            <div className="text-center">
                <button className="btn btn-success">
                    {editingId ? "Update" : "Save"}
                </button>
            </div>

        </form>

        <hr />

        <table className="table table-bordered table-hover">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Project</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                {projects.map((p) => (

                    <tr key={p.projectId}>

                        <td>{p.projectId}</td>

                        <td>{p.projectName}</td>

                        <td>{p.description}</td>

                        <td>{p.status}</td>

                        <td>{p.customer.customerName}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editProject(p)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteProject(p.projectId)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>
);
}

export default Project;