import React, { useState } from 'react'
import {FaBars } from 'react-icons/fa'
import { AiFillHome } from "react-icons/ai";
import { BiStore, BiTrendingUp, BiHistory, BiBookReader,BiLogOut } from 'react-icons/bi'
import { BsCalendarDateFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { NavLink, useNavigate } from 'react-router-dom'
import './adminSidebar.css'

function SideBar({children}) {

    const navigate = useNavigate()

    const handleLogOut = ()=> {
        localStorage.removeItem('adminToken');
        navigate("/admin")
      }

    const [isOpen] = useState(true)
    // const toggle = ()=> setIsOpen(!isOpen)
    const menuItem = [

        {
            path:'/admin/overview',
            name:'Overview',
            icon:<AiFillHome/>,
        },
        {
            path:'/admin/books',
            name:'Books',
            icon:<BiTrendingUp />,
        },
        {
            path:'/admin/members',
            name:'Members',
            icon:<BiStore/>,
        },
        {
            path:'/admin/auction',
            name:'Market',
            icon:<BiHistory/>,
        },
        {
            path:'/admin/sold',
            name:'Sold',
            icon:<BiBookReader/>,
        },
        {
            path:'/admin/addauction',
            name:'Add to Auction',
            icon:<BsCalendarDateFill/>,
        },
        {
            path:'/admin/genre',
            name:'Add Genre',
            icon:<CgProfile/>,
        },
      

    ]
  return (
    <>
        <div style={{width: isOpen ? "270px" : "50px"}} className='sidebar-admin'>
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
            <BiLogOut style={{margin:'10px auto'}} className='icon' onClick={handleLogOut}></BiLogOut>

        </div>
        {children}
    </>
  )
}

export default SideBar