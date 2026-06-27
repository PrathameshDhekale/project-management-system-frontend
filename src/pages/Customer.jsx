import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const [customer, setCustomer] = useState({
    customerName: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const loadCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response.data);
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateCustomer(editingId, customer);
    } else {
      await addCustomer(customer);
    }

    setCustomer({
      customerName: "",
      email: "",
      phone: "",
    });

    setEditingId(null);

    loadCustomers();
  };

  const editCustomer = (customer) => {
    setCustomer(customer);
    setEditingId(customer.customerId);
  };

  const removeCustomer = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  // Search
  const filteredCustomers = customers.filter((c) =>
    c.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / recordsPerPage
  );

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="text-center text-primary mb-4">
          Customer Management
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="customerName"
            placeholder="Customer Name"
            value={customer.customerName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">
            {editingId ? "Update Customer" : "Save Customer"}
          </button>

        </form>

      </div>

      <div className="card shadow mt-4 p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h4>Customer List</h4>

          <input
            type="text"
            className="form-control w-25"
            placeholder="🔍 Search Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <table className="table table-striped table-hover">

          <thead className="table-primary">

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {currentCustomers.map((c) => (

              <tr key={c.customerId}>

                <td>{c.customerId}</td>
                <td>{c.customerName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editCustomer(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCustomer(c.customerId)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀ Previous
          </button>

          <h5>
            Page {currentPage} of {totalPages || 1}
          </h5>

          <button
            className="btn btn-primary"
            disabled={
              currentPage === totalPages || totalPages === 0
            }
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next ▶
          </button>

        </div>

      </div>

    </div>
  );
}

export default Customer;