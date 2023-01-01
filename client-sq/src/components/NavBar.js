// Component for rendering the Queue
import React, {useState} from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { Container, Tabs, Tab, LinkTab } from '@mui/material';
import { NavLink } from 'react-router-dom';






const NavBar = ({children}) => {
    
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<HomeRoundedIcon fontSize="large" />
        },
        {
            path:"/history",
            name:"History",
            icon:<ScheduleRoundedIcon fontSize="large" />
        },
        {
            path:"/howtouse",
            name:"How to use",
            icon:<CommentRoundedIcon fontSize="large" />
        }
      
    ]
    return (
        
      <Container style={{
                      
        borderRight: '2.5px solid #e0e4f2',
        backgroundColor:"#ffffff",
      
        width: "17.8%",
        minHeight: "100vh",
        fontFamily:"DM Sans",
        fontWeight:"bold",
        margin: 0
        }}
       
        >
            <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:"7%",marginTop:"6%"}}>
               <div className="top_section">
                   <h1 style={{display:  "block" }} className="logo">BeachQueue</h1>
                   
               </div>
               <p style={{ marginTop:"25%", color: "#3d435a", fontSize: "120%"}}>Menu</p>
               {
                   menuItem.map((item, index)=>(
                       <NavLink style={{marginBottom: "4%", width: "85%" }}to={item.path} key={index} className="link" activeclassName="active">
                           <div style={{marginTop: "1%"}} className="icon">{item.icon}</div>
                           <div style={{display:  "block" }} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
           </Container>
    );
};

export default NavBar;

