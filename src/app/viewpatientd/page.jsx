  
  "use client"
  import { useSearchParams } from 'next/navigation'
  export  default  function (){

let  searchparams=  useSearchParams()
let name=searchparams.get("uname") ?? ""
 
    return (
        <>
        

        <h1>viewpatentdetails   username: {name}</h1>
        
        </>
    )
  }