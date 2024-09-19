'use client'

import { Session } from 'next-auth'
import React from 'react'

const HomePageContent = ({session} : {session: Session}) => {
  return (
    <div>
      {session && session?.user?.id} kjkj
    </div>
  )
}

export default HomePageContent