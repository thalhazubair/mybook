import React from 'react'
import SideBar from '../../Components/User/SideBar/SideBar'
import Bidding from '../../Components/User/Bidding/Bidding'

function Biddings() {
  return (
    <div className='Bidding' style={{display:'flex', flexDirection:'column'}}>
        <SideBar/>
        <Bidding/>
    </div>
  )
}

export default Biddings