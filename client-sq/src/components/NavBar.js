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
            icon: <HomeRoundedIcon style={{ fontSize: '3.2vh' }} />
        },
        {
            path: "/history",
            name: "History",
            icon: <ScheduleRoundedIcon style={{ fontSize: '3.2vh' }} />
        },
        {
            path: "/howtouse",
            name: "How to use",
            icon: <CommentRoundedIcon style={{ fontSize: '3.2vh' }} />
        }

    ]
    return (

        <div style = {{ borderRight: '.25vh solid #e0e4f2',backgroundColor:"#ffffff", width: '17.6vw' }}>
      <div style={{
                      
        marginLeft:'1vw', 
        backgroundColor:"#ffffff",
        minHeight: "100vh",
        fontFamily:"DM Sans",
        fontWeight:"bold"
        }}
       
        >
            <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:'1vw',marginTop:'2vh'}}>
               <div style={{
                    height: "18vh",
                    display: "flex",
                    alignItems:"center",
                    padding:"2.2vh 1.6vw"
                    }}>
                  

                <img   style={{height: 8*.615+'vw', width:8*1.254+'vw'}}
       src="logo.png" />
                   
               </div>
               <p style={{ marginTop:'0vh', color: "#3d435a",  fontSize: '2vh'}}></p>
               {
                   menuItem.map((item, index)=>(
                       <NavLink style={{marginLeft: '.65vw',marginBottom: '1.1vh', width: '12.35vw',
                       borderRadius: '.75vh',
                       padding:  "1vh .55vw",
                       gap: '1.1vh',
                       height: '5vh'

                    }}to={item.path} key={index} className="link" activeclassName="active">
                    <div style={{display:  "block",  marginTop:'-.2vh', }}>{item.icon}</div>
                    <div style={{display:  "block",  fontSize:'1.85vh' ,marginTop:'.15vh' }} >{item.name}</div>
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
        </div>
    );
};

export default NavBar;

