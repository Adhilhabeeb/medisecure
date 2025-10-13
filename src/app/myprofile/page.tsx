"use client"
import { Authcontext } from '@/Componenets/Authpassing'
import React, {  useContext, useEffect, useState, useTransition ,useRef} from 'react'

import { Button, Typography,Box,CircularProgress } from '@mui/material'
import { makecontract } from '@/walletconnect/Contract'
import { Contract } from 'ethers'
 import {
  
   DocumentData,
 } from "firebase/firestore";


       function Myprofile() {
 let context=useContext(Authcontext)
  
 let [hospitalworkingloading,starthospitalworking]=useTransition()
        const [FetchedUsers, setFetchedUsers] = useState<DocumentData[]>([])
        const [hospitalwoking, sethospitalwoking] = useState(false)
const [mycontract, setmycontract] = useState <Contract|null >(null)


useEffect(() => {

    console.log(context,"in useefect",mycontract)
    
       async   function checkhositawoeking() {
            if (context?.userdetails && mycontract) {
          let woeking= await mycontract.Hospitalscurrentworking(context?.userdetails.name);
 sethospitalwoking(woeking)
          console.log(woeking,"wooolllll")
        } 
    }
        
      starthospitalworking(checkhositawoeking)
    
}, [context,mycontract])

let [loading,startloading]=useTransition()

  const isMounted = useRef(false);



 useEffect(() => {
    
   // This effect runs on every render, including the first.
    // We want to skip the first render for certain actions.
   
     async  function fetch() {
        let contract= await makecontract()
      if (!contract) {
        return;
      }

        setmycontract(contract)

   
  }
    startloading(fetch)

           

   
 }, [])
 



  async function checkfu(){
    console.log(mycontract,context?.userdetails ,loading,"itahnn")
if (!mycontract ||!context?.userdetails || loading) {
  return ;  
}
    const isWorking = await mycontract.Hospitalscurrentworking(context?.userdetails.name);

   if(isWorking){

console.log(" working hospital ",context?.userdetails)

     let transtion=    await mycontract.pausehospital(context?.userdetails.name);
    if (transtion.gasPrice) {
sethospitalwoking(false)
            console.log("paused hospital",transtion

)
      }

   }else{
    
console.log("not working hospital ",context?.userdetails.name,"ande co",mycontract.interface)
console.log(
        "Methods in contract:",
        mycontract.interface.fragments.map((f:any) => f.name)
      );
      let transtion=   await mycontract.Addhospital(context?.userdetails.name);

      console.log(transtion)
      if (transtion.gasPrice) {
sethospitalwoking(true)
let woeking= await mycontract.Hospitalscurrentworking(context?.userdetails.name);
            console.log("resume hospital is woerking:",woeking

)
      }


   }
  }




if(!context?.userdetails){

return   <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>; 
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
     
      {entiedarrayuser.filter(([name,value])=>name!="ishospital").map(([name,value])=>
      
      {

       
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
        <Button    onClick={checkfu}
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
          {hospitalworkingloading?"loading":hospitalwoking ? `Pause Hospital  ` : `Resume hospital`}
        </Button>}
      </>
    );



  
}

 export default   Myprofile

   