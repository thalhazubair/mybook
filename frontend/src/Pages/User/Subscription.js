import React from 'react'
import SideBar from '../../Components/User/SideBar/SideBar'
import Subscription from '../../Components/User/Subscription/Subscription'

function Subscriptions() {
  return (
    <div className='subscription' style={{display:'flex'}}>
        <SideBar/>
        <Subscription/>
    </div>
  )
}

export default Subscriptions