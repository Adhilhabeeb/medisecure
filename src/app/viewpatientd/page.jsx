  
  "use client"
  import { useSearchParams } from 'next/navigation'

  import {getpatientdetails}  from "@/Componenets/getpatientdetails"
import { useEffect, useLayoutEffect, useState } from 'react'
  export  default  function (){

let  searchparams=  useSearchParams()
let name=searchparams.get("uname") ?? ""
const [patientdetails, setpatientdetails] = useState(null)

  async  function getpatinnt(params) {
    let patinet= await getpatientdetails({name,hospitalname:JSON.parse(localStorage.getItem("medisecureuser")).name})
    console.log(patinet ,"is psattttt")
    setpatientdetails(patinet)
  }
 useLayoutEffect(() => {
 

   getpatinnt()

  
 }, [])
 
    return (
        <>
        {patientdetails&& 
        
        
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