import React from 'react'
import SideBar from '../../Components/User/SideBar/SideBar'
import Bookdetails from '../../Components/User/BookDetails/BookDetails'

function BookDetails() {
  return (
    <div className='bookdetails' style={{display:'flex', flexDirection:'column'}}>
        <SideBar/>
        <Bookdetails/>
    </div>
  )
}

export default BookDetails