"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Addreportpage() {
let  searchparams=  useSearchParams()
let params=searchparams.get("uname") ?? ""
 
  return (
    <div>Addreportpage{params}</div>
  )
}

export default Addreportpage