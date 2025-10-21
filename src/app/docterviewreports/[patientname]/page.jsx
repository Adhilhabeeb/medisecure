"use client"

import { getreports } from '@/Componenets/getreports';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

  function page({params}) {
    // const params = useParams();
  const { patientname } = params; // Access the 'slug' value from the URL
useEffect(() => {
  
    async   function fetchuserreports(params) {
        
    }

    fetchuserreports()
}, [])

                //    const reportsData = await getreports({ name: toname, hospitalname });
  return (
    <div>page   docter report </div>
  )
}

export default page