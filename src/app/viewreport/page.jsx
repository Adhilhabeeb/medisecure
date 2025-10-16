
"use client"
import { Authcontext } from '@/Componenets/Authpassing'
import React, { useContext, useEffect, useState } from 'react'
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from '@/firebase';
import { makecontract } from '@/walletconnect/Contract';


import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";



function page() {


const [hosusername, sethosusername] = useState(null)
    const [mycontarct, setmycontarct] = useState(null)
    const [multipleusers, setmultipleusers] = useState([])
     let {userdetails,loading}=useContext(Authcontext)
     const [sleected, setsleected] = useState("")
     const [userpatientexist, setuserpatientexist] = useState(false)
const [fechedpatinetarray, setfechedpatinetarray] = useState([])
useEffect(() => {

if (userdetails&& fechedpatinetarray.length>0 && mycontarct) {

  console.log(userdetails,"is  userdetsails innnn")
  let {email}= userdetails
  let patinetfetch= fechedpatinetarray.filter((el)=>el.email==email)
  let toname=sleected.trim()!=""? patinetfetch.filter((el=>el.hospitalname==sleected))[0].name : patinetfetch[0].name
  
  console.log(patinetfetch,"is gthbe patinet fetch ",toname)
if(patinetfetch.length>1)
  {

    if (!multipleusers.length>0){

      console.log("legthis small")
    setmultipleusers(patinetfetch)
    }



   
  }


 async function checkUserEmail(name) {
      try {
        const userExists = await mycontarct?.getuseremial(name);
        console.log("userExists  :", userExists);
      
sethosusername(name)
        if (userExists) {
          setuserpatientexist(userExists);
        } else {
          setuserpatientexist(false);
        }
      } catch (err) {
        console.log("Error fetching user email:", err?.reason);
        setuserpatientexist(false);
      }
    console.log(name,"is  name  passed  ")
}

    checkUserEmail(toname);

  console.log(email,"is thne emai;")
  
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
      console.log("updted the fetchpat",fechedpatinetarray)
        });
let contract=  await makecontract()


if (!contract) return;

setmycontarct(contract)


  }
  

  patientusersfetch()

}, [])

    
    console.log(userdetails,loading,"is conn")
  return (
    <div>
        viewrepopaget {userdetails?.name}
        {userpatientexist? "userexits":"notexist"}
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
        </div>
  )
}

export default page;