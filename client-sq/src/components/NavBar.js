// Component for rendering the Queue
import React, {useState} from "react"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { Container, Tabs, Tab, LinkTab } from '@mui/material';
export default function NavBar() {
    const [value, setValue] = useState(1);

    const handleChange = (event,newValue) => {
      setValue(newValue);
      console.log(value)
    };
    return (
      <>
        <Container style={{
                        
                        outline: '2.5px solid #e0e4f2',
                        backgroundColor:"#ffffff",
                        width: window.innerWidth*0.17,
                        height: "100vh",
                        fontFamily:"DM Sans",
                        margin: 0
                        }}
                        //sx={{boxShadow:10}}
                        >
        <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", margin: window.innerHeight*.035, boxShadow:"none"}}>
          <h1 style={{fontWeight:"1000", fontSize:window.innerHeight*.035, color:"#3d435a", fontFamily:"DM Sans", marginTop:50}}>BeachQueue</h1>
          <p style={{ fontSize:window.innerHeight*.02, fontWeight: "bold", marginTop:window.innerHeight*.055, color: "#3d435a", }}>Menu</p>

          <Tabs orientation="vertical" value={value} onChange={handleChange}>
            <Tab href="/" icon={<HomeRoundedIcon/>} iconPosition="start" label="Home" value="0" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab href="/history" icon={<ScheduleRoundedIcon/>} iconPosition="start" label= "History" value="1" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab href="/use" icon={<CommentRoundedIcon/>} iconPosition="start" label="How To Use" value="2" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
          </Tabs>
 
        </div>
      </Container>
      </>
    )
}