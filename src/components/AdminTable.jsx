import React, { useState } from "react";
import "../App.css";
import users from "./Data";
import Pagination from "./Pagination";

const AdminTable = () => {
  const [value, setValue] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [accessStatus, setAccessStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const handleDesignationFilter = (e) => {
    setDesignationFilter(e.target.value);
  };

  const handleAccessStatus = (e) => {
    setAccessStatus(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPage = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (newVal >= 1 && newVal <= 20) {
      setItemsPerPage(newVal);
      setCurrentPage(1);
    }
  };

  const handleOnBlur = (e) => {
    if (e.target.value === "") {
      setItemsPerPage(5);
    }
  };

  const filteredUser = users.filter((user) => {
    return (
      (user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phone.includes(value)) &&
      (designationFilter === "" || user.designation === designationFilter) &&
      (accessStatus === "" || user.access === accessStatus)
    );
  });

  const indexOfLastUser = itemsPerPage * currentPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUser = filteredUser.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <div className="App">
      <h1>Admin Table</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, email, phone"
          value={value}
          onChange={handleSearch}
        />
        <select value={designationFilter} onChange={handleDesignationFilter}>
          <option value="">All Designations</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Tester">Tester</option>
        </select>
        <select value={accessStatus} onChange={handleAccessStatus}>
          <option value="">All Access Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Designation</th>
            <th>Access Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.designation}</td>
              <td>{user.access}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="error">
        {currentUser.length === 0 && <div>No Items matches Your Search</div>}
      </div>
      <div className="filters">
        <input
          type="number"
          placeholder="Items per page"
          min={1}
          max={20}
          onChange={handleItemsPerPage}
          onBlur={handleOnBlur}
        />
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalUser={users.length}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminTable;
