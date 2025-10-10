
"use client"
import { Authcontext } from '@/Componenets/Authpassing'
import React, { useContext } from 'react'

function page() {
    
     let {userdetails}=useContext(Authcontext)
    console.log(userdetails,"is conn")
  return (
    <div>
        viewrepopaget {userdetails?.name}
        </div>
  )
}

export default page;