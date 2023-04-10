import React from "react";
import { Outlet, Navigate } from "react-router-dom";


function AdminVerification(){
 
    const adminToken = localStorage.getItem('adminToken')
    return adminToken ? <Outlet/> : <Navigate to = '/admin'/>

}

export default AdminVerification