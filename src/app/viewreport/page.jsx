
"use client"
import { Authcontext } from '@/Componenets/Authpassing'
import React, { useContext, useEffect, useState, useTransition } from 'react'
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from '@/firebase';
import { makecontract } from '@/walletconnect/Contract';
import Table from '@mui/material/Table';
import TableBody from     '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getpatientdetails } from "@/Componenets/getpatientdetails";

import { Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, Box } from "@mui/material";
import { getreports } from '@/Componenets/getreports';
import Image from 'next/image';


function Imagecompoinet({path}){
  return <Image src={path}  width={30} height={30} />
}
function page() {

const [reports, setreports] = useState([])
let [transition,starttransition]=useTransition()
const [hosusername, sethosusername] = useState(null)
    const [mycontarct, setmycontarct] = useState(null)
    const [multipleusers, setmultipleusers] = useState([])
     let {userdetails,loading}=useContext(Authcontext)
     const [sleected, setsleected] = useState("")
     const [userpatientexist, setuserpatientexist] = useState(false)
const [fechedpatinetarray, setfechedpatinetarray] = useState([])
useEffect(() => {


// console.log(loading,"ois loadi ng")
if (userdetails&& fechedpatinetarray.length>0 && mycontarct) {

  // console.log(userdetails,"is  userdetsails innnn")
  let {email}= userdetails
  let patinetfetch= fechedpatinetarray.filter((el)=>el.email==email)
  let toname=sleected.trim()!=""? patinetfetch.filter((el=>el.hospitalname==sleected))[0].name : patinetfetch[0].name
  if(sleected.trim()==""){
   console.log(sleected,"ikiki",patinetfetch[0].hospitalname,"is the nulla value",toname)
setsleected(patinetfetch[0].hospitalname)


  }
  // console.log(patinetfetch,"is gthbe patinet fetch ",toname)
if(patinetfetch.length>1)
  {
    if (!multipleusers.length>0){

      // console.log("legthis small")
    setmultipleusers(patinetfetch)
    }



   
  }


 async function checkUserEmail(name) {
      let hospitalname=sleected.trim()!=""? patinetfetch.filter((el=>el.hospitalname==sleected))[0].hospitalname : patinetfetch[0].hospitalname

   try {

    

    // let recoreds= await getpatientdetails({name,hospitalname:patinetfetch[0].hospitalname})
    // console.log(recoreds,"is the recored getted")
        const userExists = await mycontarct?.getuseremial(name);
        console.log("userExists onname  :", userExists);
      
sethosusername(name)

        if (userExists) {
           setuserpatientexist(true);


//           console.log("usersd is the usersede:",users,"Amdnnd",)

         
        } else {
          setuserpatientexist(false);
        }

//           console.log(hospitalname,"is ythe hopspoytal name ",toname)
let reportsdhh=await getreports({name:toname,hospitalname})
console.log(reportsdhh,"is the resoprts si the ")
setreports(reportsdhh)
      } catch (err) {
        console.log("Error fetching user email:", err);
        setuserpatientexist(false);
      }



    // console.log(name,"is  name  passed  in func ")
}

     starttransition(checkUserEmail.bind(null,toname)) ;
    

  // console.log(email,"is thne emai;")
  
}
}, [userdetails,fechedpatinetarray,mycontarct,sleected])



useEffect(() => {
  
  
   async function patientusersfetch() {
        const q = query(collection(db, "patinetuser"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let  fetched = [];
          querySnapshot.forEach((doc) => {
            fetched.push({ ...doc.data(), id: doc.id });
          });
          const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
      setfechedpatinetarray(sorted)
      // console.log("updted the fetchpat",fechedpatinetarray)
        });
let contract=  await makecontract()


if (!contract) return;

setmycontarct(contract)


  }
  

  patientusersfetch()

}, [])

    
if(loading)    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );

    // console.log(userdetails,loading,"is conn")
  return (
    <div>
        viewrepopaget {userdetails?.name}
      <Button loading={transition} variant="contained">
          {userpatientexist? "userexits":"notexist"}
      </Button>
                   {multipleusers.length>0&& <FormControl fullWidth>
              <InputLabel id="hospital-select-label">Select Hospital</InputLabel>
              <Select
                labelId="hospital-select-label"
                value={sleected}
                label="Select Hospital"
                onChange={(e)=>setsleected(e.target.value)}
              >
                {multipleusers.length > 0 &&
                  multipleusers.map(({hospitalname}, index) => (
                    <MenuItem key={index} value={hospitalname}>
                      {hospitalname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>}    
            
            
            
            
            {reports.length>0 ?    <>
            {/* {reports?.map(({date,doctername,docterspecilist,imagepath,medicines})=>{




            })} */}
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell align="right">date</TableCell>
            <TableCell align="right">doctername</TableCell>
            <TableCell align="right">docterspecilist</TableCell>
            <TableCell align="right">imagepath</TableCell>
            <TableCell align="right">medicines</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {reports?.map(({date,doctername,docterspecilist,imagepath,medicines},ind)=>(
            <TableRow
              key={ind}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {date}
              </TableCell>
              <TableCell align="right">{doctername}</TableCell>
              <TableCell align="right">{docterspecilist}</TableCell>
              <TableCell align="right">{
           imagepath.length>0?imagepath.map((el,ind)=><Imagecompoinet key={ind} path={el}/>):"no pathfound"
                
                }</TableCell>
               <TableCell align="right">{
           medicines.length>0?medicines.map(el=>el):"no medicinesfound"
                
                }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
            
            
            </>:"no reports"}    </div>
  )
}

export default page;