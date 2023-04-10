import React, { useState } from 'react'
import {FaBars } from 'react-icons/fa'
import { AiFillHome } from "react-icons/ai";
import { BiStore, BiTrendingUp, BiHistory, BiBookReader } from 'react-icons/bi'
import { BsCalendarDateFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function SideBar({children}) {
    const [isOpen] = useState(true)
    const menuItem = [

        {
            path:'/home',
            name:'Home',
            icon:<AiFillHome/>,
        },
        {
            path:'/trending',
            name:'Trending',
            icon:<BiTrendingUp />,
        },
        {
            path:'/market',
            name:'Market',
            icon:<BiStore/>,
        },
        {
            path:'/recent',
            name:'History',
            icon:<BiHistory/>,
        },
        {
            path:'/toread',
            name:'To Read',
            icon:<BiBookReader/>,
        },
        {
            path:'/duedate',
            name:'Due Date',
            icon:<BsCalendarDateFill/>,
        },
        {
            path:'/profile',
            name:'Profile',
            icon:<CgProfile/>,
        },

    ]
  return (
    <>
        <div className='sidebar'>
            <div className='top_section'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>MyBook</h1>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
                    <FaBars/>
                </div>
            </div>
            {
                menuItem.map((item,index)=>(
                <NavLink to={item.path} key={index} className='link' activeclassName='active'>
                    <div className='icon'>{item.icon}</div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        {children}
    </>
  )
}

export default SideBar