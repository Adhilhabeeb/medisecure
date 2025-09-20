"use client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import {makecontract} from "@/walletconnect/Contract"
import {getallpatietarray} from "@/Componenets/Hospital/getallpatientarray"
import { Box, Divider, Grid } from '@mui/material';


export  function LoadingComponet () {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}
function Hospitalmainpage() {
const [fetching , setfetching ] = useState(true)
  const [error, seterror] = useState(null)
  const [Allpatients, setAllpatients] = useState([])
  const [contract, setcontract] = useState(null)

useEffect(() => {
 let user=localStorage.getItem("medisecureuser")
  
  async function fetcontct(params) {
   
  let cont= await makecontract()
 
if (cont &&user) {
  
  setcontract(cont)
  localStorage.setItem("mycontract",JSON.stringify(cont))
  let  hospitaldetails=JSON.parse(user)    
  const Allpatients = await getallpatietarray(cont,hospitaldetails.name)
         if (Allpatients && !Error.isError(Allpatients)) {
          setfetching(false)
      let  gg=  Allpatients.map((r, i) => ( {name:r.name,age:r.age,bloodgroup:r.bloodgroup}));
          // console.log(gg,"si the array of patients ")
          setAllpatients(gg)
         }else{
          setfetching(false)
       if (Allpatients instanceof Error) {
console.log("is the from the getallpatients",Allpatients.reason)
        seterror(Allpatients)
       }
         }


}
}
fetcontct()
}, [])




if (fetching) {
  return <h1> loading data  </h1>
}
if ( error) {
  return <h1>  {error.reason}</h1>
}



  return (
    <Box  textAlign={"center"}    height={"auto"}     width={"100%"}  >
<Typography  variant="h3"  mt={3}   fontWeight={"700"} color="primary.main" component={"h2"}>
All patients 
</Typography>
    <List
      
      sx={{
        marginTop:"3em",
        backgroundColor:"whitesmoke",
        width: '90%',
        borderRadius:"9px ",
         display:"block",
         marginLeft:"auto",marginRight:"auto",
    
        position: 'relative',
        overflow: 'auto',
      
        '& ul': { padding: 0 },
      }}
    
     
    >
      {Allpatients?.map((patient) => (
        <>
        
        <Grid container    padding={"1em"} >
  <Grid size={{ xs: 12, md: 8 }} >
  <Box  boxSizing={"border-box"} paddingLeft={"1em"} textAlign={"start"} >

<Typography variant='h5'     fontFamily={"monospace"} component={"p"}>
{patient.name}
</Typography>

  </Box>
  </Grid>
  <Grid size={{ xs: 12, md: 4 }}>
  <Box>iytem222</Box>
    
  </Grid>
  
</Grid>

  <Divider />
</>
      ))}
    </List>



    </Box>
  )
}

export default Hospitalmainpage