import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>Tabs</h3>
        <button onClick={handleToggleDetails}>
          {showDetails ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </button>
      </div>
      <div className={`sidebar-tabs ${showDetails ? "show-details" : ""}`}>
        <ul>
          <li
            className={selectedTab === 0 ? "active" : ""}
            onClick={() => handleTabClick(0)}
          >
            Users
          </li>
          <li
            className={selectedTab === 1 ? "active" : ""}
            onClick={() => handleTabClick(1)}
          >
            New Requests
          </li>
          <li
            className={selectedTab === 2 ? "active" : ""}
            onClick={() => handleTabClick(2)}
          >
            Service Providers
          </li>
        </ul>
      </div>
      <main>
        {selectedTab === 1 && <AllUsers />}
        {selectedTab === 2 && <ServiceProviders />}
        {selectedTab === 3 && <NewServiceProviders />}
      </main>
    </div>
  );
};

const AllUsers = () => {
  return (
    <div>
      <h2>All Users</h2>
    </div>
  );
};

const ServiceProviders = () => {
  return (
    <div>
      <h2>Service Providers</h2>
    </div>
  );
};

const NewServiceProviders = () => {
  return (
    <div>
      <h2>New Service Providers</h2>
    </div>
  );
};

export default Sidebar;
