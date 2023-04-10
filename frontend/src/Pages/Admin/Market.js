import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSideabar/adminSidebar'
import Market from '../../Components/Admin/Market/Market'



function Markets() {  
  return (
    <div style={{ display: 'flex' }}>
<AdminSidebar/>
<Market/>
    </div>
    
  )
}

export default Markets