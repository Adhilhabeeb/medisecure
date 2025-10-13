  
  "use client"
  import { useSearchParams } from 'next/navigation'
 import {Emailsenter }  from "@/Componenets/Hospital/mailsent"
  import {getpatientdetails}  from "@/Componenets/getpatientdetails"
import { startTransition, useEffect, useLayoutEffect, useState, useTransition } from 'react'
import { Button, Typography } from '@mui/material'
  export  default  function (){
let [transition,starttransition]=useTransition()
let  searchparams=  useSearchParams()
let name=searchparams.get("uname") ?? ""
const [patientdetails, setpatientdetails] = useState(null)
const [message, setmessage] = useState(null)
  async  function getpatinnt(params) {

starttransition( async ()=>{
      let patinet= await getpatientdetails({name,hospitalname:JSON.parse(localStorage.getItem("medisecureuser")).name})
    console.log(patinet ,"is psattttt")
    let {patientde,message}=patinet;
    if (message) {
      setmessage(message)
    }
    setpatientdetails(patientde)
})
  }
 useLayoutEffect(() => {


   getpatinnt()

  
 }, [])
 
    return (
        <>
       
{transition&&<>
   <Button  sx={{margin:"0 auto"}} loading/>
</>}


        {!transition&&patientdetails&& 
      
        
        Object.entries(patientdetails).map(([name,value])=>{
return(
  <>
  {name} :{value}
  
   </>
)
        })
        
  
        }


{message&&      <Typography color='error'>
      {message}
     </Typography>}


        
        </>
    )
  }