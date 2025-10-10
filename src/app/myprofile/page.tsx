"use client"
import { Authcontext, authuser } from '@/Componenets/Authpassing'
import React, { useContext } from 'react'
import { usertype } from '../page'
import { notFound } from 'next/navigation'
 

function page() {

 let context=useContext(Authcontext)
if(!context?.userdetails){
return ; 
}

let {userdetails}=context
if (userdetails?.ishospital) {
    return (<>
    
    hospitalname:{userdetails.name}
    email:{userdetails.email}
    </>)
}

return <>myproguke {userdetails?.name}
</>
  
}

export default page