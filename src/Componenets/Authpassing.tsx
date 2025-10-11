
"use client"
import { usertype } from '@/app/page';
import { usePathname, useRouter } from 'next/navigation';

import React, { createContext, useContext ,useState,useLayoutEffect, useEffect} from 'react'
  export type authuser={
    userdetails:usertype|null;
  }

export  const  Authcontext=createContext<authuser |null>(null)
function Authpassing({children}:Readonly<{
  children: React.ReactNode;
}>) {
  






  
  let router=useRouter()
  
  let pathname:string=usePathname()
  
  const [userdetails, setuserdetails] = useState<null | usertype>(null);
  const [loading, setloading] = useState(true)
  useLayoutEffect(() => {

    let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;

      console.log(storge,"0708y708y608t608t08t08t08t08t088")
    if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr,"sitttttttstrrrrr");
      setuserdetails(parsedusr);
    }else{
      console.log("storage not found")
 if (pathname!="/" && pathname!="signup") {
  // router.push("/signin")
 }
    }
    setloading(false)
  },[]);

  useEffect(() => {
     let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;
   console.log(storge ,"isstorfgge")
 if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr,"sitttttttstrrrrr");
      setuserdetails(parsedusr);
    }else{
      console.log("storage not found")

 if (pathname!="/"  && pathname!="/signup") {

  
  router.push("/signin")
 }else{

  console.log('signiuporr home')
 }
    }
    setloading(false)
  },[pathname])
  
  return (
    <>   
   <Authcontext.Provider value={{userdetails}}>


        {children}
   </Authcontext.Provider>
    </>

  )
}

export  {Authpassing}