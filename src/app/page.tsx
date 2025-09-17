"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [userdetails, setuserdetails] = useState<null | usertype>();
  useEffect(() => {
    let storge: string | undefined =
      localStorage.getItem("medisecureuser") ?? undefined;
    if (storge) {
      let parsedusr = JSON.parse(storge);
      console.log(parsedusr);
      setuserdetails(parsedusr);
    }
  }, []);

  return (
    <>
      <Link href={"/signup"}>signup</Link>
      {userdetails?.ishospital?<h1>
       hospital user 
      </h1>:<h1>
      normal usert  {userdetails?.name} </h1>}
      {}
    </>
  );
}
