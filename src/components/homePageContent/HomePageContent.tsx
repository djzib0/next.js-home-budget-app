'use client'

import { BudgetType } from '@/lib/types'
import { getExpectedCurrentBudgetName } from '@/lib/utils'
import { Session } from 'next-auth'
import React from 'react'

const HomePageContent = ({session, currentBudget} : {session: Session; currentBudget: BudgetType | {message: string}}) => {

  const userId = session.user?.id;

  return (
    <div>
      {getExpectedCurrentBudgetName()}
      {userId}
    </div>
  )
}

export default HomePageContent