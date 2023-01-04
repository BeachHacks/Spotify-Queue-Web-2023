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
            icon:<HomeRoundedIcon style={{fontSize: window.innerWidth*.018}} />
        },
        {
            path:"/history",
            name:"History",
            icon:<ScheduleRoundedIcon style={{fontSize: window.innerWidth*.018}} />
        },
        {
            path:"/howtouse",
            name:"How to use",
            icon:<CommentRoundedIcon style={{fontSize: window.innerWidth*.018}} />
        }
      
    ]
    return (
        <div style = {{ borderRight: '.3vh solid #e0e4f2',backgroundColor:"#ffffff", width:window.innerWidth*.17 }}>
      <Container style={{
                      
       
        backgroundColor:"#ffffff",
      
       
        minHeight: "100vh",
        fontFamily:"DM Sans",
        fontWeight:"bold",
        margin: 0
        }}
       
        >
            <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:window.innerWidth*.01,marginTop:window.innerHeight*.02}}>
               <div className="top_section">
                   <h1 style={{display:  "block",
                    fontFamily: 'DM Sans',
                    fontWeight: "bold",
                    fontSize: window.innerWidth *.02,
                    color: "#3d435a"
                
                }} >BeachQueue</h1>
                   
               </div>
               <p style={{ marginTop:window.innerHeight*.07, color: "#3d435a",  fontSize: window.innerHeight*.02}}>Menu</p>
               {
                   menuItem.map((item, index)=>(
                       <NavLink style={{marginBottom: window.innerHeight*.005, width: window.innerWidth*.123,
                       borderRadius: window.innerHeight*.015,
                        padding:  "4% 6.7%",
                        gap: window.innerHeight*.012
                       
                       
                       }}to={item.path} key={index} className="link" activeclassName="active">
                           <div >{item.icon}</div>
                           <div style={{display:  "block",  fontSize: window.innerHeight*.02,marginTop:window.innerHeight*.002 }} >{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
           </Container>
           </div>
    );
};

export default NavBar;

