"use client"
import { Authcontext, authuser } from '@/Componenets/Authpassing'
import React, { cache, Suspense, useContext, useEffect, useState } from 'react'
import { usertype } from '../page'
import { notFound } from 'next/navigation'
import { Button, Typography } from '@mui/material'
import { makecontract } from '@/walletconnect/Contract'
import { Contract } from 'ethers'
 import {
   query,
   collection,
   onSnapshot,
   DocumentData,
 } from "firebase/firestore";
import { db } from '@/firebase'

       function Myprofile() {
        const [FetchedUsers, setFetchedUsers] = useState<DocumentData[]>([])
        const [hospitalwoking, sethospitalwoking] = useState(false)
const [mycontract, setmycontract] = useState <Contract|null >(null)
 let context=useContext(Authcontext)

 useEffect(() => {

     async  function fetch() {
        let contract= await makecontract()
      if (!contract) {
        return;
      }
        setmycontract(contract)
    
   
  }
    
           

    fetch()
   
 }, [])
 


 useEffect(() => {
    console.log(mycontract,"s s conttractt",context?.userdetails)
  async function checkfu(){
if (!mycontract ||!context?.userdetails) {
  return;  
}
    // const isWorking = await mycontract.Hospitalscurrentworking();
  }
 }, [hospitalwoking])
 
if(!context?.userdetails){
return ; 
}

// console.log(context,"coonnnddttext")



let {userdetails}=context
           let entiedarrayuser=Object.entries(userdetails)
           
entiedarrayuser.forEach(([name,value])=>{
if (name!="hospitalname") {
    return [name,value];
}
return ;

})

          
    return (
      <>
      {entiedarrayuser.map(([name,value])=>
      
      {

        if (name=="ishospital") return;
        return   (

        <>

        
<Typography variant="h3">
     {name}:{value}
</Typography><br/>
        </>
      )

      }
    )
      
      }
    
   

   {userdetails.ishospital&&
        <Button    onClick={()=>sethospitalwoking(!hospitalwoking)}
          sx={{
            borderColor: "primary.main",
            border: "0.5px solid", // Define border width and style

            "&:hover": {
              backgroundColor: "primary.main", // Change background on hover
              color: "white", // Change text color on hover
              cursor: "pointer", // Indicate interactivity
            },
          }}
        >
          {hospitalwoking ? "Pause Hospital " : "Resume hospital"}
        </Button>}
      </>
    );



  
}

 export default   Myprofile

   