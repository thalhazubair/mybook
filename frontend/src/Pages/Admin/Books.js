import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSideabar/adminSidebar";
import Book from "../../Components/Admin/Books/Books";

function Books() {


  return (

    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Book />
    </div>
  );
}

export default Books;
