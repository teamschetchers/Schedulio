import React, { useState } from "react";
import "./Admin.css";
import ListAllBookings from "./ListAllBookings/ListAllBookings";
import ListBookings from "./ListBookings/ListBookings";
import ListServices from "./ListServices/ListServices";
import Services from "./Services/Services";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("listServices"); // state to keep track of active tab

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {};

  const getContent = () => {
    switch (activeTab) {
      case "services":
        return <Services />;
      case "listServices":
        return <ListServices />;
      case "listBookings":
        return <ListBookings />;

      case "listAllBookings":
        return <ListAllBookings />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="main">
        <div className="sidebar">
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("listServices")}
          >
            All Services
          </div>
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("services")}
          >
            Create Service
          </div>
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("listAllBookings")}
          >
            Bookings
          </div>
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("listBookings")}
          >
            New Bookings
          </div>
        </div>
        <div className="content">{getContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
