import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function Individialpage() {
  return (
    <div>


          it is the page withputbthe user  sign inneded   

          <Link href={"/signin"}>
        <Button>
                 go to sign in
        </Button>
          </Link>
    </div>
  )
}

export default Individialpage