
"use client"
import { Authcontext } from '@/Componenets/Authpassing'
import React, { useContext } from 'react'

function page() {
    
     let {userdetails,loading}=useContext(Authcontext)
    console.log(userdetails,loading,"is conn")
  return (
    <div>
        viewrepopaget {userdetails?.name}
        </div>
  )
}

export default page;