import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSideabar/adminSidebar'
import Genre from '../../Components/Admin/Genre/Genre'

function Genres() {
  return (
    <div style={{ display: 'flex' }}>
    <AdminSidebar/>
    <Genre/>
        </div>
  )
}

export default Genres