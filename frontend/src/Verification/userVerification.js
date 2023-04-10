import React from "react";
import { Outlet, Navigate } from "react-router-dom";


function UserVerification(){
 
    const userToken = localStorage.getItem('userToken')
    return userToken ? <Outlet/> : <Navigate to = '/'/>

}

export default UserVerification