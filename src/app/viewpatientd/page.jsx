  
  "use client"
  import { useSearchParams } from 'next/navigation'

  import {getpatientdetails}  from "@/Componenets/getpatientdetails"
import { startTransition, useEffect, useLayoutEffect, useState, useTransition } from 'react'
import { Button } from '@mui/material'
  export  default  function (){
let [transition,starttransition]=useTransition()
let  searchparams=  useSearchParams()
let name=searchparams.get("uname") ?? ""
const [patientdetails, setpatientdetails] = useState(null)

  async  function getpatinnt(params) {
starttransition( async ()=>{
      let patinet= await getpatientdetails({name,hospitalname:JSON.parse(localStorage.getItem("medisecureuser")).name})
    console.log(patinet ,"is psattttt")
    setpatientdetails(patinet)
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
        })}

        
        </>
    )
  }