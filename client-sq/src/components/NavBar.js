// Component for rendering the Queue
import {React, useState} from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
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

        <div style = {{ backgroundColor:"#ffffff", borderRight: '.25vh solid #e0e4f2', width: '17.6vw',height: "100vh" }}>
      <div style={{
       
        marginLeft:'1vw', 

        fontFamily:"DM Sans",
        fontWeight:700
        
        }}
       
        >
            <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:'1vw',marginTop:'2vh'}}>
               <div style={{
                    height: "18vh",
                    display: "flex",
                    paddingTop: ".8vh",
                    paddingLeft: ".75vw"
                    }}>
                  

                <img   style={{ width: 17*.674+'vw', height: 17*0.511+'vw'}}
       src="logo.png" />
                   
               </div>
               <p style={{ marginTop:'4vh', color: "#3d435a",  fontSize: '2vh'}}></p>
               {
                   menuItem.map((item, index)=>(
                       <NavLink style={{marginLeft: '.65vw',marginBottom: '1vh', width: '12.35vw',
                       borderRadius: '.75vh',
                       padding:  "1vh .6vw",
                       gap: '1.1vh',
                       height: '5vh'

                    }}to={item.path} key={index} className="link" activeclassName="active">
                    <div style={{display:  "block",  marginTop:'-.09vh', width: '1.7vw' }}>{item.icon}</div>
                    <div style={{display:  "block",  fontSize:'1.025vw' ,fontWeight: 500,marginTop:'.09vh',marginLeft: '.08vw' }} >{item.name}</div>
                </NavLink>
            ))
        }
                </div>
                
                <main>{children}</main>

                <label src='Sun.png'  class="switch" style= {{marginLeft: '9.75vw',marginTop:'46vh'}}  >
                <input type="checkbox" />
                <span class="slider round"></span>
    </label>
            </div>
        </div>
    );
};

export default NavBar;

