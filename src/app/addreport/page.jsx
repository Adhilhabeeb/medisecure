"use client";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  Stack,
  CardActions,
  Button,
  IconButton,
  Badge,
  ImageListItem,
  ImageList,
  ImageListItemBar,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { AddCircle, Delete, Image, ShoppingBag } from "@mui/icons-material";
// string memory medicine,string memory imagedatastr,string memory  hospitalname,string memory name,string memory doctername,string memory docterspecilist
function Addreportpage() {
  let searchparams = useSearchParams();
  let medicinetextfield=useRef(null)
  let params = searchparams.get("uname") ?? "";
  const [patient, setpatient] = useState({
    name: "",
    hospitalname: JSON.parse(localStorage.getItem("medisecureuser")).name,
    doctername: "",
    docterspecilist:"",
    medicines:[],
    imagepaths:[] 

  });

  function handleaddmedicines(value) {
    if (value.trim()!="") {
      setpatient(prev=>{

  return{
    ...prev,medicines:[...prev.medicines,value]
  }
})
      
    }
  }
   async function  handlesubmit (){

   }
   function handleinputchange(e) {
    setpatient((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
function handleaddfile (e){
  
  console.log(e.target.files,"is the fuke",URL.createObjectURL(e.target.files[0])
) 
if (e.target.files[0]) {
  setpatient(prev=>{

  return{
    ...prev,imagepaths:[...prev.imagepaths,e.target.files[0]]
  }
})
}
}
  useEffect(() => {
    
  
  console.log(patient,"is ythe patiemnt ")
  }, [patient])
  
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      pt={5}
      boxSizing={"border-box"}
    >
      <Card
        sx={{
          width: "30%",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: " rgba(53, 52, 52, 0.2) 0px 2px 8px 0px",
        }}
      >
        <CardHeader
          title={
            <Typography
              textAlign={"center"}
              fontFamily={"monospace"}
              component={"h3"}
              fontSize={"25px"}
            >
              Add Report
            </Typography>
          }
        />
        <CardContent>
          {/* {success&&<Typography  textAlign={"center"}  color='green' variant="caption" >
     <DoneIcon fontSize="small"/> sucess
        </Typography>}
      {error&&  <Typography color='red' variant="caption" >
          {error}
        </Typography>} */}
          <Stack
            maxWidth={"80%"}
            direction={"column"}
            margin={"0 auto"}
            spacing={2}
          >
            <TextField
              fullWidth
              onChange={(e) => handleinputchange(e)}
              id="standard-password-input"
              label="username"
              type="text"
              name="name"
              variant="standard"
            />

            <TextField
              id="standard-read-only-input"
              name="hospitalname"
              label="hospital name"
              defaultValue={
                JSON.parse(localStorage.getItem("medisecureuser")).name
              }
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
              <TextField
              fullWidth
              onChange={(e) => handleinputchange(e)}
              id="standard-password-input"
              label="doctername"
              placeholder="enter the doctername"
              type="text"
              name="doctername"
              variant="standard"
            />
                 <TextField
              fullWidth
              onChange={(e) => handleinputchange(e)}
              id="standard-password-input"
              label="docterspecilist"
              placeholder="enter the docterspecilist for"
              type="text"
              name="docterspecilist"
              variant="standard"
            />

  <TextField
              fullWidth
              onChange={(e) => handleaddfile(e)}
              id="standard-password-input"
              label="image data"
              placeholder="enter the docterspecilist for"
            type="file"   accept="image/*"
              name="imagedata"
              variant="standard"
            />
            <Box  position={"relative"}  height={"auto"} >
              <ImageList sx={{ width:"100%", height: "auto" }} cols={3} rowHeight={64}>
  {patient.imagepaths.length>0&&patient.imagepaths.map((file,ind)=>(
<>
{/* <IconButton size="small">
  <img  src={URL.createObjectURL(file)}  />
</IconButton> */}
 <ImageListItem key={ind} >
      <img
       
        src={URL.createObjectURL(file)}
       
        loading="lazy"
      />
                <ImageListItemBar
            // title={item.title}
            // subtitle={item.author}
            actionIcon={
              <IconButton

              sx={{top:"-30px",right:"-5px"}}
           onClick={()=>{
let index=patient.imagepaths.indexOf(file)
console.log(file.name,"is ythe gile",index,"is the index")
let arrayremoved=patient.imagepaths.filter(el=>el.name!=file.name)
console.log(arrayremoved,"si the sarayrenived")
  setpatient(prev=>{

  return{
    ...prev,imagepaths:arrayremoved
  }
})

           }}
               
              >
                <Delete sx={{color:"red"}} />
              </IconButton>
            }
          />

    </ImageListItem>

</>
              ))}

              </ImageList>
            
            </Box>
           
            <Box display={"flex"}>
      <TextField
              fullWidth
            ref={medicinetextfield}
              id="standard-password-input"
              label=" add medicines"
              placeholder="enter the docterspecilist for"
              type="text"
              name="add medicines"
              variant="standard"
            />
<IconButton  onClick={()=>{
  console.log(medicinetextfield.current)
if(medicinetextfield.current){
  let impu= medicinetextfield.current.querySelector("input")
handleaddmedicines(impu.value)
  
}

}}>
  <AddCircle/>
</IconButton>
            </Box>

          </Stack>
        </CardContent>
        <CardActions>
          <Button
            onClick={handlesubmit}
            // disabled={isPending}
            variant="contained"
            sx={{ margin: "0 auto" }}
            size="small"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Addreportpage;
