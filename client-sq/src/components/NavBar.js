// Component for rendering the Queue
import React from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children }) => {

    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <HomeRoundedIcon style={{ fontSize: '1.7vw' }} />
        },
        {
            path: "/history",
            name: "History",
            icon: <ScheduleRoundedIcon style={{ fontSize: '1.7vw' }} />
        },
        {
            path: "/howtouse",
            name: "How to use",
            icon: <CommentRoundedIcon style={{ fontSize: '1.7vw'  }} />
        }

    ]
    return (


      <div style={{
        borderRight: '.25vh solid #e0e4f2',              
        width: "17.60417vw",
        backgroundColor:"#ffffff",
        padding: "0% 0%", 
        minHeight: "100vh",
        fontFamily:"DM Sans",
        fontWeight:700
        }}
       
        >
            <div style={{width: "17.60417vw",alignItems:"center", alignSelf:"center", alignContent:"center", padding: "0% 15%" }}>
               <div style={{
                    height: "18vh",
                    display: "flex",
                    alignItems:"center",
                    padding:"2.2vh 1.6vw"
                    }}>
                  

                <img   style={{height: 8*.615+'vw', width:8*1.254+'vw'}}
       src="logo.png" />
                   
               </div>
               <p style={{ marginTop:'4vh', color: "#3d435a",  fontSize: '2vh'}}></p>
               {
                   menuItem.map((item, index)=>(
                       <NavLink style={{ width: '100%',
                       borderRadius: '.75vh',
                       padding:  "1vh .6vw",
                       gap: '1.1vh',
                       height: '5vh'

                    }}to={item.path} key={index} className="link" activeclassName="active">
                    <div style={{display:  "block",  marginTop:'-.09vh', width: '1.7vw' }}>{item.icon}</div>
                    <div style={{display:  "block",  fontSize:'1.025vw' ,marginTop:'.09vh',marginLeft: '.08vw' }} >{item.name}</div>
                </NavLink>
            ))
        }
                </div>
                <div style={{ marginLeft: '1.8vw', marginTop: '52vh' }}>
                    <a style={{
                        fontFamily: 'DM Sans',
                        fontWeight: 300,
                        fontSize: '1.5vh',
                        color: "#496fff",
                        marginRight: '.5vw'
                    }} >Powered by</a>
                    <img style={{ height: 2.6 * .709 + 'vw', width: 2.6 * 2.362 + 'vw' }}
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" />
                </div>
                <main>{children}</main>
            </div>
    );
};

export default NavBar;


