import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/Admin/AdminLogin";
import Member from '../Pages/Admin/Member'
import Genre from "../Pages/Admin/Genre";
import AddGenres from "../Pages/Admin/AddGenre";
import AddAuctions from "../Pages/Admin/AddAuction";
import Markets from "../Pages/Admin/Market";
import Solds from "../Pages/Admin/Sold";
import Books from "../Pages/Admin/Books";
import AdminVerification from "../Verification/adminVerification";
import Dashboards from "../Pages/Admin/Dashboard";
import AddBooks from "../Pages/Admin/Addbook";
import AddedBooks from "../Pages/Admin/Addedbooks";



const AdminRoutes = ()=>{
    return(
    <Routes>

      <Route path="/" element={<AdminLogin/>}/>
      
      <Route element={<AdminVerification/>}>
      <Route path="/members" element={<Member/>}/>
      <Route path="/genre" element={<Genre/>}/>
      <Route path="/addgenre" element={<AddGenres/>}/>
      <Route path="/addauction" element={<AddAuctions/>}/>
      <Route path="/addbook" element={<AddBooks/>}/>
      <Route path="/auction" element={<Markets/>}/>
      <Route path="/sold" element={<Solds/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/overview" element={<Dashboards/>}/>
      <Route path="/addedbooks" element={<AddedBooks/>}/>

      </Route>
    
    </Routes>
    )
}

export default AdminRoutes