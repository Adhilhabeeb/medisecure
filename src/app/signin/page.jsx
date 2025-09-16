
"use client"


import { useSearchParams } from 'next/navigation';

import React, { useEffect } from 'react'

function page() {
    
 const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const username = searchParams.get("username");

  return (
    <div>
        
        
        sign in



    </div>
  )
}

export default page