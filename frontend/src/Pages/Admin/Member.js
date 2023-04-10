import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSideabar/adminSidebar'
import Member from '../../Components/Admin/Members/Members'



function Members() {  
  return (
    <div style={{ display: 'flex' }}>
<AdminSidebar/>
<Member/>
    </div>
    
  )
}

export default Members