import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSideabar/adminSidebar";
import Dashboard from "../../Components/Admin/Dashboard/Dashboard";

function Dashboards() {


  return (

    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Dashboard />
    </div>
  );
}

export default Dashboards;
