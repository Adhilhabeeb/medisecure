"use client";
import { useSearchParams } from "next/navigation";
import {makecontract} from "../../walletconnect/Contract"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
  import {getreports} from "@/Componenets/getreports"
import {doctors} from "@/utils/docters"
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
import { AddCircle, Delete, DoneAll, Image, ShoppingBag } from "@mui/icons-material";
import { contract2 } from "../../Abi/contracts";
import { getallpatients } from "@/Componenets/Hospital/getallpatientarray";
import z from "zod";
// string memory medicine,string memory imagedatastr,string memory  hospitalname,string memory name,string memory doctername,string memory docterspecilist
function Addreportpage() {
const [sucess, setsucess] = useState(false)
  const [error, seterror] = useState(null)
   const [docterspecialist, setdocterspecialist] = React.useState('');
   const handleChange = (event) => {
    console.log(event.target.value,"is s  s sythe docternsamer")
    // setdo(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
    const myRegex = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+$/;

   let schemareport =z.object({
        name:z.string().regex(myRegex,{message:'username must contain only alphanumeric characters.'}),
        doctername:z.string().min(3,{message:"enter the doctername "}),
        docterspecilist:z.string().min(2,{message:"enter a  valid docterspecialist"}),
        hospitalname:z.string(),
        medicines:z.string({message:"the medicines array error"}),
        imagepaths:z.string({message:"the imag array error"})

      })
      function checkpatientfor(data){

  let datas={name:data.name.toLowerCase(),
    hospitalname:data.hospitalname,
    doctername: data.doctername,
    docterspecilist:data.docterspecilist,
    medicines:data.medicines,
    imagepaths:data.imagepaths
  }

      let vv=schemareport.safeParse(datas)
      console.log(vv,"si the vvvvv")
if (vv.success) {
 
  seterror(null)
  return vv.data
}
if (vv.error) {
 
  console.log(vv.error.issues[0].message,"s the reror messga")
  seterror(vv.error.issues[0].message)
  return null
}
    // Valid input
    // const validResult = usernameschema.safeParse('hello123');
    // console.log(validResult.success); // true

    // // Invalid input
    // const invalidResult = usernameschema.safeParse('hello!');
    // console.log(invalidResult.success); // false
    // if (!invalidResult.success) {
    //   console.log(invalidResult.error.issues[0].message); // Input must contain only alphanumeric characters.
    // }
//     let vv=schemapatinet.safeParse(datas)
// if (vv.success) {
//   seterror(null)
//   return vv.data
// }
// if (vv.error) {
//   console.log(vv.error.issues[0].message)
//   seterror(vv.error.issues[0].message)
//   return null
// }
}
  let searchparams = useSearchParams();
  let medicinetextfield=useRef(null)

  let params = searchparams.get("uname") ?? " ";
  console.log(params,"si params")
  const [patient, setpatient] = useState({
    name: params.toString() ,
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
seterror("plz enter a  valid user name")
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
  let dataparsed= checkpatientfor(datatopass)
  if(!dataparsed) return ;
  console.log("is the datapareded",JSON.parse(dataparsed.medicines),error)
  let addreport= await contract.addreports(datatopass.medicines,datatopass.imagepaths,datatopass.hospitalname,datatopass.name,datatopass.doctername,datatopass.docterspecilist)
 if (addreport.gasPrice) {
  console.log(addreport,"is the rpeot sucess")
setsucess(" transaction complete")
seterror(null)
return;
 }

console.log(addreport,"is the addreporyt  aftetef")

} catch (error) {

 setsucess(false)
 seterror("transaction failed")
  console.log(error.reason,"is errorooroor")
}




// console.log(patietsaray,"is the paytie",patietsaray.find((el)=>el.name==patient.name))
  
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
  
  useEffect(() => {
 console.log(patient.doctername,"is chaged docnsme")
setpatient((prev=>({...prev,docterspecilist:""})))

 if (patient.doctername.trim()=="") return;
let docterspecialist =doctors.find(el=>el.name==patient.doctername)
console.log(docterspecialist,"is gfilyter docte speculkait")
if ("name" in docterspecialist) {
setpatient((prev=>({...prev,docterspecilist:docterspecialist.specialization})))
  
}
}, [patient.doctername])

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
                
    
       {sucess&&<Typography  textAlign={"center"}  color='green' variant="caption" >
        <DoneAll fontSize="small"/> sucess
           </Typography>}
         {error&&  <Typography color='red' variant="caption" >
             {error}
           </Typography>}
          {/* {success&&<Typography  textAlign={"center"}  color='green' variant="caption" >
     <DoneIcon fontSize="small"/> sucess
        </Typography>}
      {error&&  <Typography color='red' variant="caption" >
          {error}
        </Typography> } */}
          <Stack  marginTop={2}
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
              defaultValue={params}
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
              {/* <TextField
              fullWidth
              onChange={(e) => handleinputchange(e)}
              id="standard-password-input"
              label="doctername"
              placeholder="enter the doctername"
              type="text"
              name="doctername"
              variant="standard"
            /> */}
           <FormControl sx={{border:"none"}} size="small">
      <InputLabel  id="demo-select-small-label">Docter name</InputLabel>
      <Select
        labelId="demo-select-small-label"
        onChange={(e) => handleinputchange(e)}
        id="demo-select-small"
        value={patient.doctername}
      fullWidth
      name="doctername"
        label="doctername"
     
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        
      {doctors.map((el,ind)=>{
        return  <MenuItem  key={ind} value={el.name}>
          <em>{el.name}</em>
        </MenuItem>
      })}
      </Select>
    </FormControl>
                 <TextField
              fullWidth
              onChange={(e) => handleinputchange(e)}
              id="standard-password-input"
              // label="docterspecilist"
           
              value={patient.docterspecilist}
              // placeholder="enter the docterspecilist for"
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
        <Button onClick={getreports.bind(null,patient)}>
          getreports
        </Button>
      </Card>
    </Box>
  );
}

export default Addreportpage;
