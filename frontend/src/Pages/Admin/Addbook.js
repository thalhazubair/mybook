import React from "react";
import SideBar from '../../Components/Admin/AdminSideabar/adminSidebar'
import AddBook from "../../Components/Admin/AddBook/AddBook"

function AddBooks(){
    return(
        <div style={{display:'flex'}}>
            <SideBar/>
            <AddBook/>
        </div>
    )
}

export default AddBooks