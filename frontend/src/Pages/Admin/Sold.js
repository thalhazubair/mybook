import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSideabar/adminSidebar'
import Sold from '../../Components/Admin/Sold/Sold'



function Solds() {  
  return (
    <div style={{ display: 'flex', position:'absolute' }}>
<AdminSidebar/>
<Sold/>
    </div>
    
  )
}

export default Solds