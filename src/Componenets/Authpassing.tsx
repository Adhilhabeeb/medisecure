
"use client"
import { usertype } from '@/app/page';
import { checksignisdocter } from '@/utils/docters';
import { usePathname, useRouter } from 'next/navigation';

import React, { createContext, useContext ,useState,useLayoutEffect, useEffect} from 'react'
  export type authuser={
    userdetails:usertype|null;
    loading?:Boolean,
    isdocter?:Boolean
  }

export  const  Authcontext=createContext<authuser |null>(null)
function Authpassing({children}:Readonly<{
  children: React.ReactNode;
}>) {
  






  
  let router=useRouter()
  
  let pathname:string=usePathname()
  
  const [userdetails, setuserdetails] = useState<null | usertype>(null);
  const [loading, setloading] = useState(true)
  const [isdocter, setisdocter] = useState(false)
  useLayoutEffect(() => {

    let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;

      console.log(storge,"0708y708y608t608t08t08t08t08t088")
    if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr,"sitttttttstrrrrr");

      setuserdetails(parsedusr);
             async function checkisuser() {
let  isdoc= await checksignisdocter(parsedusr.email)
console.log(isdoc,"is doceter in authpassing")
        setisdocter(isdoc)
           setloading(false)
      }
      checkisuser()
    }else{
         setloading(false)
      console.log("storage not found")
 if (pathname!="/" && pathname!="signup") {
  router.push("/signin")
 }
    }



 
  },[]);

  useEffect(() => {
     let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;
   console.log(storge ,"isstorfgge")
 if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr,"sitttttttstrrrrr");
      setuserdetails(parsedusr);
               async function checkisuser() {
let  isdoc= await checksignisdocter(parsedusr.email)
console.log(isdoc,"is doceter in authpassing in pathchnge")
        setisdocter(isdoc)
           setloading(false)
      }
      checkisuser()
    }else{
      console.log("storage not found")
   setloading(false)
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
   <Authcontext.Provider value={{userdetails,loading,isdocter}}>


        {children}
   </Authcontext.Provider>
    </>

  )
}

export  {Authpassing}