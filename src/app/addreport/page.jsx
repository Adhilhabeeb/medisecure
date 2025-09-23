"use client";
import { useSearchParams } from "next/navigation";
import {makecontract} from "../../walletconnect/Contract"

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
  Chip,
} from "@mui/material";
 import {imagetopinata} from "@/Componenets/Hospital/convertimagetostring"
import React, { useEffect, useRef, useState } from "react";
import { AddCircle, Delete, Image, ShoppingBag } from "@mui/icons-material";
import { contract2 } from "../../Abi/contracts";
import { getallpatients } from "@/Componenets/Hospital/getallpatientarray";
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

let contract=await makecontract()
 if (contract) {
  console.log(contract,"ois the contract")
let patietsaray=await getallpatients()
console.log(patietsaray,"Andn",patietsaray.find((el)=>el.name==patient.name))
if (!patietsaray.find((el)=>el.name==patient.name)) {
//patinet  not found   by the username
return;
}

try {
  
  let datatopass={
    ...patient
  }

  
   let  data =await imagetopinata(patient.imagepaths) 
datatopass.imagepaths=JSON.stringify(data)
datatopass.medicines=JSON.stringify(datatopass.medicines)
  console.log(JSON.parse(datatopass.imagepaths),"i ythe  imgpathjhhh",datatopass.medicines)
  let addreport= await contract.addreports(datatopass.medicines,datatopass.imagepaths,datatopass.hospitalname,datatopass.name,datatopass.doctername,datatopass.docterspecilist)

console.log(addreport,"is the addreporyt  aftetef")

} catch (error) {
  
}




// console.log(patietsaray,"is the paytie",patietsaray.find((el)=>el.name==patient.name))
  
 }
  

   }



 async function getreports(params) {

let contract=await makecontract()
try {
    
let reports= await contract.getreports("amritha","sup79")

console.log(reports.length,"is the ropporyfs s from getreportfunctuin")
if (reports.length>0) {
console.log(JSON.parse(reports[0][3])[0],"is the reports in get f")
  
}
} catch (error) {
  console.log(error,"in getrepirtr")
}
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

<Box>
{ patient.medicines.length >0 && <>
{patient.medicines.map((el,ind)=>{

  return (<> 
  
  <Chip  label={el} onDelete={()=>{
    let index=patient.medicines.indexOf(el)
console.log(el,"is el",index,"is the index")
let arrayremoved=patient.medicines.filter(me=>me!=el)
console.log(arrayremoved,"si the sarayrenived")
setpatient((prev)=>{
  return{...prev,
  medicines:arrayremoved
  }
})
  }}/>
 

   </>)
})}
</>}
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
        <Button onClick={getreports}>
          getreports
        </Button>
      </Card>
    </Box>
  );
}

export default Addreportpage;
