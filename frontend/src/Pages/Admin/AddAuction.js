import React from "react";
import SideBar from '../../Components/Admin/AdminSideabar/adminSidebar'
import AddAuction from '../../Components/Admin/AddAuction/AddAuction'

function AddAuctions(){
    return(
        <div style={{display:'flex'}}>
            <SideBar/>
            <AddAuction/>
        </div>
    )
}

export default AddAuctions