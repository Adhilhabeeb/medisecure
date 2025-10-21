"use client"


import { useContext, useLayoutEffect, useState } from "react"
import {getallpatinetsofdoc} from "@/Componenets/docter/docterfunc"
import { fetchdoctores } from "./addpatinettodocter"
import { Authcontext } from "../Authpassing"
import Link from "next/link"
function Docter() {


  let {userdetails}=useContext(Authcontext)
  const [docterdetails, setdocterdetails] = useState(null)
  const [hospital, sethospital] = useState(null)
useLayoutEffect(()=>{

async function fetchpatinets(){
 let docter= await fetchdoctores()


//  console.log(docter,"  is ther docters")
if (docter.length>0) {
let email =userdetails.email

// console.log(email,"is te mial",docter)
let docterar=docter.find(el=>el.docteremail==email)



  console.log(docterar,"is dsodfc arryyyyy")
  setdocterdetails(docterar)
}
//    await  getallpatinetsofdoc()
}
  fetchpatinets()
},[])

function handleclick(params) {
     sethospital(prev=>{

      return  prev==params?null:params

     })
}

  return (
    <div>Docter page {
      docterdetails?.doctername


   
    }
    <br></br>
       hospitalfound:  {  docterdetails?.hospitalname?.map((el,ind)=>{


return ( 

  <div>

<div  className={el}  onClick={handleclick.bind(null,el)} >

  {el}<br></br>
  {   hospital ==el&&<>



  <div >  {docterdetails.patinets.filter(el=>el.hospitalname==hospital).map(el=>{
    return ( <Link  href={`docterviewreports/${el.name}`}>
    {el.name}
    </Link>)
  })}</div>
  

  
  </>}
  </div>
  </div>)
       })}</div>
  )
}

export default Docter

