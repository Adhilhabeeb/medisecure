"use client"
import { Avatar, Box, Button, Chip, Drawer, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import ReactDOM from "react-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';


import { deepOrange } from '@mui/material/colors';
import {hosptialnavitem,usernavitems} from "@/utils/navitems"
import Checkuseronlocalstorage  from "@/Componenets/userexist"
import Link from 'next/link'
import styled from '@emotion/styled'
import { redirect, usePathname, useRouter } from 'next/navigation';
export  const dynamic="force-dynamic"
function Header() {
  let router=useRouter()
let navitems=useRef(null)
let pathname=usePathname()
const drawerWidth = 250
const [hovernavindex, sethovernavindex] = useState(null)
const [openprofile, setopenprofile] = useState(false)
const [user, setuser] = useState(null)
// useEffect(() => {
//   console.log("renn");

//   // initial check

//   // watch for localStorage changes
//   const handleStorageChange = () => {
//     alert("kk")
//     const updatedUser = Checkuseronlocalstorage();
//     setuser(updatedUser);
//     navitems.current = updatedUser?.isHospital ? hosptialnavitem : usernavitems;
//   };

//   window.addEventListener("storage", handleStorageChange);

//   return () => {
//     window.removeEventListener("storage", handleStorageChange);
//   };
// }); // run only once




const Item = styled(Paper)(({  }) => ({
 
    background:"red"
}));
    
    function handlesignout() {
localStorage.removeItem("medisecureuser")
setopenprofile(false)

setuser(null)


redirect("/signin")


}

useEffect(() => {
  const existingUser = Checkuseronlocalstorage();
  

  if (existingUser) {
 console.log("exisyt",existingUser)
    setuser(existingUser);
    navitems.current = existingUser.ishospital ? hosptialnavitem : usernavitems;
  }
}, [])

  useEffect(() => {
  
  const existingUser = Checkuseronlocalstorage();
  if (existingUser) {
    setuser(existingUser);
    navitems.current = existingUser.ishospital ? hosptialnavitem : usernavitems;
  }


  }, [pathname]);
   
  //   const handleSignOut = () => {
  //   localStorage.removeItem("medisecureuser");
  //   setuser(null);
  //   redirect("/")
  // };

 
  return (
    <div>

     
{/* Laptop-laregmoinite  */}
<Box width={"90%"} height={{md:"50px"} }     bgcolor={"transparent"}   margin={" 0 auto"} mt={1}  borderRadius={"9px"} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" } zIndex={2000} display={{md:"flex"}} >
    <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"} >
        <Typography variant='p' textAlign={"center"}  component={"h3"}>

            MediSecure
            </Typography>


  
    </Stack>

  
<Stack direction="row"  flexGrow={3} display={{xs:"none",sm:"flex"}}   alignItems={"center"}  justifyContent={"center"}  spacing={2} >
    
  {user&&
  navitems.current?.map(({name,href},ind)=>{
return(
    <Link key={ind} href={href}>
        <Chip  color={'primary'}  variant={ind==hovernavindex?"filled":"outlined"}  onMouseEnter={()=>{
          sethovernavindex(ind)
        }}   onMouseLeave={()=>sethovernavindex(null)} label={name +ind} />
        <div  ></div>
    </Link>
)
})
}

</Stack>


<Stack flexGrow={1} alignItems={"center"} justifyContent={"center"}>
  {user ? (
    <>
      <Avatar
        onClick={() => setopenprofile(!openprofile)}
        sx={{ bgcolor: deepOrange[500], width: 40, height: 40 }}
      >
        {user?.name[0] ?? "?"}
      </Avatar>

      {openprofile &&
        ReactDOM.createPortal(
          <Box
            width={drawerWidth}
            boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
            sx={{
              textAlign: "center",
              position: "fixed",
              top: "9%",
              right: "5%",
              zIndex: 2000,
              bgcolor: "white",
              borderRadius: 2,
              minWidth: 200,
            }}
          >
            <Typography variant="h6" sx={{ my: 2 }}>
              Hi, {user.name}
            </Typography>
            <Divider />
            <List>
              <ListItem onClick={() => redirect("/myprofile")}>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Go to Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handlesignout}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Signout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>,
          document.body
        )}
    </>
  ) : (
    <Link href={"/signin"}>
      <Button variant="contained">sign in</Button>
    </Link>
  )}
</Stack>

</Box>


{/* Laptop-laregmoinite  */}



  
    </div>
  )
}

export default Header