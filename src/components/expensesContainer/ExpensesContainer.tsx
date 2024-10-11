'use client'

import React, { useState } from 'react'
import ExpenseForm from '../expenseForm/ExpenseForm'
import Expenses from '../budgetDetails/expenses/Expenses'
import { BudgetType, Expense } from '@/lib/types'

const ExpensesContainer = ({budget, userId, expenses} : {budget: BudgetType, userId: string, expenses: Expense[]}) => {

  const [isShowDetailsOn, setIsShowDetailsOn] = useState(true);

  const toggleShowDetails = () => {
    setIsShowDetailsOn(prevState => !prevState)
  }

  return (
    <div>
      {isShowDetailsOn && <button onClick={toggleShowDetails}>Add new expense</button>}
      {!isShowDetailsOn && <button onClick={toggleShowDetails}>Display expenses</button>}
      {!isShowDetailsOn && <ExpenseForm userId={userId} budgetId={budget._id} />}
      {isShowDetailsOn && <Expenses expenses={expenses} />}
    </div>
  )
}

export default ExpensesContainer