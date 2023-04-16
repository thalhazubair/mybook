import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSideabar/adminSidebar";
import AddedBook from "../../Components/Admin/AddedBooks/Addedbooks";

function AddedBooks() {


  return (

    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <AddedBook />
    </div>
  );
}

export default AddedBooks;
