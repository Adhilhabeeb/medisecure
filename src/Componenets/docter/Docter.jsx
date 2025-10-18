"use client"


import { useLayoutEffect } from "react"
import {getallpatinetsofdoc} from "@/Componenets/docter/docterfunc"
function Docter() {

useLayoutEffect(()=>{

async function fetchpatinets(){
//    await  getallpatinetsofdoc()
}
  fetchpatinets()
},[])

  return (
    <div>Docter page</div>
  )
}

export default Docter