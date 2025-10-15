"use client"
import { makecontract } from '@/walletconnect/Contract'
import { Box, Card, CardHeader, Typography,CardContent, TextField, Stack,CardActions,Button } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
//name blood age hispitalname
import DoneIcon from '@mui/icons-material/Done';
  import { z } from 'zod';
import { redirect, useSearchParams } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import {Emailsenter} from "@/Componenets/Hospital/mailsent"
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from "../../firebase"

function page() {
  const [email, setemail] = useState("")
  const [ishospitalworking, setishospitalworking] = useState(true)
  let saerchparas=useSearchParams()
  let bloodarra= [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "a+",
  "a-",
  "b+",
  "b-",
  "ab+",
  "ab-",
  "o+",
  "o-"
];

    const myRegex = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+$/;
    let schemapatinet =z.object({
      name:z.string().regex(myRegex,{message:'username must contain only alphanumeric characters.'}),
      age:z.string().min(1,{message:"enter the age "}),
      bloodgroup:z.enum(bloodarra,{message:"plzz enter a  valid bloodgroup"}),
      hospitalname:z.string(),
      email:z.email({message:"plz enter a avlid email"})
    })
 const [isPending, startTransition] = useTransition();
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState(null)
const [patient, setpatient] = useState({name:"",age:"",bloodgroup:"",hospitalname:JSON.parse(localStorage.getItem("medisecureuser")).name})
function handleinputchange(e) {
setpatient(prev=>{

  return {...prev,[e.target.name]:e.target.value}
})
  
}


function checkpatientfor(data){

  let datas={name:data.name.toLowerCase(),
    age:data.age,
    bloodgroup:data.bloodgroup.toUpperCase(),
    hospitalname:data.hospitalname,
    email:email
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
    let vv=schemapatinet.safeParse(datas)
if (vv.success) {
  seterror(null)
  return vv.data
}
if (vv.error) {
  console.log(vv.error.issues[0].message)
  seterror(vv.error.issues[0].message)
  return null
}
}


 async function handlesubmit(params) {
seterror(null)

// Emailsenter()


// return ;
  let datapasresd=checkpatientfor(patient)
  if(!datapasresd){
  return;
  }

  console.log(datapasresd,"after")
startTransition(async (
)=>{
    let {name,bloodgroup,age,hospitalname}=datapasresd
  console.log(name,bloodgroup,age,hospitalname,"isiisis")
  let contract=await makecontract()
if (contract) {
let woeking= await contract.Hospitalscurrentworking(hospitalname);
console.log(woeking,"is hospitalwoekinggggggg")

if (!woeking) {
  seterror("Your are not working now ")
  setishospitalworking(false)
  return;
}

  try {
    
    const addpatient = await   contract.addpatient(name,bloodgroup,age,hospitalname)
console.log(addpatient,"is the addpatiet return ")
if (addpatient.gasPrice) {
 await   Emailsenter(name,hospitalname,email);

                        const docRef = await addDoc(collection(db, "patinetuser"), {
                          name,email,hospitalname
                        });
                        console.log(docRef,"added to atoientusersarray")
console.log("workled")
seterror(null)
  setsuccess(true)

setTimeout(() => {

  redirect("/?load=true")
  
}, 1000);

}
    
  } catch (error) {

   if (!isRedirectError(error)) {
    
  seterror(  "payment cancelled")
      
      }
  setsuccess(false)
    console.log("addpatieterror",error)
  }
  
}
})

}


useEffect(() => {
  
// console.log(patient,"is")
//  async function checkhospitalwoeking() {
//   console.log(JSON.parse(localStorage.getItem("medisecureuser")).name,"is nme from localstor")
// let woeking= await contract.Hospitalscurrentworking(JSON.parse(localStorage.getItem("medisecureuser")).name);
// setishospitalworking(woeking)
// }
// checkhospitalwoeking()
}, [])



return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} pt={5} boxSizing={"border-box"}>
<Card      sx={{width:"30%",
backgroundColor:"white",
borderRadius:"10px",
boxShadow:" rgba(53, 52, 52, 0.2) 0px 2px 8px 0px"


}}>
     <CardHeader
        
       
        title={
         <Typography textAlign={"center"}    fontFamily={"monospace"}  component={"h3"}   fontSize={"25px"}   >
Add Patient
        </Typography>}
       
      />
       <CardContent >
        {success&&<Typography  textAlign={"center"}  color='green' variant="caption" >
     <DoneIcon fontSize="small"/> sucess
        </Typography>}
      {error&&  <Typography color='red' variant="caption" >
          {error}
        </Typography>}
 <Stack  maxWidth={"80%"} direction={"column"}  margin={"0 auto"}  spacing={2}>
  
          <TextField fullWidth     onChange={(e)=>handleinputchange(e)}
          id="standard-password-input"
          label="username"
          type="text"
       name='name'
          variant="standard"
        />
           <TextField fullWidth  onChange={(e)=>handleinputchange(e)}
          id="standard-password-input"
          label="Age"
          type="number"
       name='age'
          variant="standard"
        />
           <TextField fullWidth  onChange={(e)=>handleinputchange(e)}
          id="standard-password-input"
          label="bloodGroup"
          type="text"
        name='bloodgroup'
          variant="standard"
        />
          <TextField fullWidth  onChange={(e)=>setemail(e.target.value)}
          id="standard-password-input"
          label="User email"
          value={email}
          type="text"
        name='useremail'
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          name='hospitalname'
          label="hospital name"
          defaultValue={JSON.parse(localStorage.getItem("medisecureuser")).name}
          variant="standard"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
 </Stack>

      </CardContent>
          <CardActions>
      <Button onClick={handlesubmit} disabled={isPending || !ishospitalworking} variant="contained" sx={{margin:"0 auto"}} size="small">Submit</Button>
    </CardActions>
</Card>

    </Box>
  )
}

export default page