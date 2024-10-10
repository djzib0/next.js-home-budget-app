'use client'

import React, { useState } from 'react'
import ExpenseForm from '../expenseForm/ExpenseForm'
import Expenses from '../budgetDetails/expenses/Expenses'
import { BudgetType, Expense } from '@/lib/types'

const ExpensesContainer = ({budget, userId, expenses} : {budget: BudgetType, userId: string, expenses: Expense[]}) => {

  const [showDetails, setShowDetails] = useState(true);

  const toggleShowDetails = () => {
    setShowDetails(prevState => !prevState)
  }

  return (
    <div>
      <button onClick={toggleShowDetails}>showdetails</button>
      {!showDetails && <ExpenseForm userId={userId} budgetId={budget._id} />}
      {showDetails && <Expenses expenses={expenses} />}
    </div>
  )
}

export default ExpensesContainer