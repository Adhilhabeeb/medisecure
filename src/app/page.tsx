"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
import './globals.css';

import { Suspense, useEffect, useLayoutEffect, useState } from "react";
 import  Individialpage from "@/Componenets/individialpage"
 import Hospitalmainpage from "@/Componenets/Hospital/hospitalmainpage"
 import Usermain from "@/Componenets/userpage/Usermain"
import Checkuseronlocalstorage from "@/Componenets/userexist"
import { useSearchParams } from "next/navigation";
import { checksignisdocter } from '@/utils/docters';
import { set } from 'zod';
       type usertype = Record<string, string>
import Docter from '@/Componenets/docter/Docter';

 function Home() {
  let searchparams=useSearchParams()

  const [userdetails, setuserdetails] = useState<null | usertype>(null);
  const [loading, setloading] = useState(true)
  const [isdocter, setisdocter] = useState(false)
  useLayoutEffect(() => {

    let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;
    if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr.email,"is the parsed user from local storage");


      setuserdetails(parsedusr);


      async function checkisuser() {
let  isdoc= await checksignisdocter(parsedusr.email)
        setisdocter(isdoc)
          setloading(false)
      }
      checkisuser()
      console.log(parsedusr, "is the parsed user from local storage");
    }else{
         setloading(false)
    }
 
  },[]);



  if (loading) {
    return <>
    <h1>loading</h1></>
  }
if (!loading  && isdocter) {
  return <>
  <Docter/>
  
  </>
}

  if (!loading&& !userdetails) {
    return <Individialpage/>
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



export default  function name() {
  return  <Suspense fallback={<div>Loading...</div>}>

 <Home/>
  </Suspense>
}
export type {usertype}