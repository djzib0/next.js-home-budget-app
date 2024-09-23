'use client'

import { BudgetType } from '@/lib/types'
import React from 'react'

const HomePageContent = ({currentBudget, latestBudget} : {currentBudget: BudgetType; latestBudget: BudgetType}) => {

  return (
    <div>
      {!currentBudget && <p>There is no budget for this month</p>}
      {currentBudget && 
      <p>{currentBudget.budgetName}</p>}
      {latestBudget && 
      <p>{latestBudget.budgetName}</p>}
    </div>
  )
}

export default HomePageContent