// Component for rendering the Queue
import React from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children, theme, mode }) => {

    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <HomeRoundedIcon style={{ fontSize: '3vh' }} />
        },
        {
            path: "/history",
            name: "History",
            icon: <AccessTimeFilledRoundedIcon style={{ fontSize: '3vh' }} />
        },
        {
            path: "/howtouse",
            name: "How to use",
            icon: <HelpCenterRoundedIcon style={{ fontSize: '3vh' }} />
        }

    ]

    return (

        <div style={{ backgroundColor: theme.palette.background.secondary, borderRight: '.25vh solid ' + theme.palette.common.border, width: '17.6vw', height: "100vh" }}>
            <div style={{
                marginLeft: '1vw',
                fontFamily: "DM Sans",
                fontWeight: 700
            }}>
                <div style={{ alignItems: "center", alignSelf: "center", alignContent: "center", marginLeft: '1vw', marginTop: '2vh' }}>
                    <div style={{
                        height: "18vh",
                        display: "flex",
                        paddingTop: ".5vh",
                        paddingLeft: "1.6vw"
                    }}>


                        <img style={{ width: 17 * .625 + 'vw', height: 17 * 0.533 + 'vw' }}
                            src="logo.png" />

                    </div>
                    <p style={{ marginTop: '4vh', color: theme.palette.text.primary, fontSize: '2vh' }}></p>
                    {
                        menuItem.map((item, index) => (
                            <NavLink style={{
                                marginLeft: '.65vw',
                                marginBottom: '1vh',
                                width: '12.35vw',
                                borderRadius: '.75vh',
                                padding: "1vh .6vw",
                                gap: '1.1vh',
                                height: '5vh'
                            }}
                                to={item.path}
                                key={index}
                                className={mode === "light" ? "link" : "link1"}
                                activeclassName="active">
                                <div style={{  marginTop: '-.09vh', width: '3vh' }}>{item.icon}</div>
                                <div style={{ display: "block", fontSize: '1.85vh', fontWeight: 500, marginTop: '.09vh', marginLeft: '.05vw' }} >{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>

                <main>{children}</main>
            </div>
        </div>
    );
};

export default NavBar;

