import React from "react";
import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes'
import UserRoutes from './Routes/UserRoutes'

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes/>}/>
        <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
      </Router> 
    </>
  );
}

export default App;
