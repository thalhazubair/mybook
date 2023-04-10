import React from 'react'
import SideBar from '../../Components/Admin/AdminSideabar/adminSidebar'
import AddGenre from '../../Components/Admin/AddGenre/AddGenre'

function AddGenres() {
  return (
    <div className='AddGenre'>
        <SideBar/>
        <AddGenre/>
    </div>
  )
}

export default AddGenres