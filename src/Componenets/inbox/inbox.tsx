"use client";

import {
  KnockProvider,
  KnockFeedProvider,
  NotificationFeed,
  NotificationIconButton,
  NotificationFeedPopover,
  NotificationCell,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useState,useRef, useContext, useEffect, useTransition } from "react";
import { Authcontext } from "../Authpassing";
import { checkdocterisalreadyexist } from "../docter/addpatinettodocter";

const Inbox = ({userid}:{userid?:string}) => {
    const [idtppass, setidtppass] = useState<string | null>(userid?userid:null)
    let context=useContext(Authcontext)


    let [loading,startloading]=useTransition()
  // An example of fetching the current authenticated user
  const notifButtonRef = useRef(null);
  const user = {
    id: "12c23775-5902-481a-b8ea-d1704aabc769",
  };

useEffect(() => {

async function checkif() {
console.log(context?.userdetails,"i sthe contecttuserdetisl")

  let  {isdocterexist,docteruser}=await   checkdocterisalreadyexist(context?.userdetails?.email)

  console.log("docteruser=",isdocterexist,"docter",docteruser)
  if(docteruser){
setidtppass(`${docteruser.createdAt}`)
  }
}

if(context?.userdetails) startloading(checkif);
}, [context?.userdetails])


      const [isVisible, setIsVisible] = useState(false);



  return (
    <>

{!loading &&  <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      user={{ id: `${idtppass}`}}
    >
      <KnockFeedProvider 
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
        colorMode="light"
      >
        <>
          <div className="mb-4">
           
            <NotificationIconButton   
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
            
            
            />
          </div>
          <div className="h-[550px] w-[420px]">
            <NotificationFeedPopover
             buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}  >
              
            </NotificationFeedPopover>
          </div>
        </>
      </KnockFeedProvider>
    </KnockProvider>}

     
    </>
 
  );
};

export default Inbox;