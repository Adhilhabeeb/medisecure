"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
import './globals.css';

import { useEffect, useLayoutEffect, useState } from "react";
 import  Individialpage from "@/Componenets/individialpage"
 import Hospitalmainpage from "@/Componenets/Hospital/hospitalmainpage"
 import Usermain from "@/Componenets/userpage/Usermain"
import Checkuseronlocalstorage from "@/Componenets/userexist"
import { useSearchParams } from "next/navigation";
       type usertype = Record<string, string>


export default function Home() {
  let searchparams=useSearchParams()

  const [userdetails, setuserdetails] = useState<null | usertype>(null);
  const [loading, setloading] = useState(true)
  useLayoutEffect(() => {

    let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;
    if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr);
      setuserdetails(parsedusr);
    }
    setloading(false)
  },[]);



  if (loading) {
    return <>
    <h1>loading</h1></>
  }


  return (
<>
   
{!loading&& userdetails?
<>
      
      {userdetails?.ishospital?<>

<Hospitalmainpage/>

      </>:
      
<> 
 <Usermain  user={userdetails} />
  </ >
      
     
       
       }

      {}
    </>
:<>
<Individialpage/>


 </>}



</>

    

  );
}


export type {usertype}