// Component for rendering the Queue
import React, {useState} from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { Container, Tabs, Tab } from '@mui/material';
export default function NavBar() {
    const [value, setValue] = useState(1);

    const handleChange = (event,newValue) => {
      setValue(newValue);
      console.log(value)
    };
    return (
      <>
        <Container style={{
                        backgroundColor:"#ffffff",
                        width: window.innerWidth*0.2,
                        height: "100vh",
                        fontFamily:"DM Sans"
                        }}
                        sx={{boxShadow:10}}
                        >
        <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:window.innerWidth*0.01, boxShadow:10}}>
          <h1 style={{fontWeight:"bolder", marginTop: 10, color:"#3d435a", fontFamily:"DM Sans"}}>BeachQueue</h1>
          <p style={{ marginTop:50, color: "#3d435a", }}>Menu</p>

          <Tabs orientation="vertical" value={value} onChange={handleChange}>
            <Tab icon={<HomeRoundedIcon/>} iconPosition="start" label="Home" value="0" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab icon={<ScheduleRoundedIcon/>} iconPosition="start" label= "History" value="1" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab icon={<CommentRoundedIcon/>} iconPosition="start" label="How To Use" value="2" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
          </Tabs>
 
        </div>
      </Container>
      </>
    )
}