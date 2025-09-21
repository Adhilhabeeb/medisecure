"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
import { useEffect, useState } from "react";
 import  Individialpage from "@/Componenets/individialpage"
 import Hospitalmainpage from "@/Componenets/Hospital/hospitalmainpage"
 import Usermain from "@/Componenets/userpage/Usermain"
import Checkuseronlocalstorage from "@/Componenets/userexist"
import { useSearchParams } from "next/navigation";
type usertype = {
  contactnum: string;
  email: string;
  hospitalname: string;
  id: string;
  ishospital: boolean;
  name: string;
  password: string;
};
export default function Home() {
  let searchparams=useSearchParams()

  const [userdetails, setuserdetails] = useState<null | usertype>(null);
  const [loading, setloading] = useState(true)
  useEffect(() => {

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
 <Usermain/>
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
