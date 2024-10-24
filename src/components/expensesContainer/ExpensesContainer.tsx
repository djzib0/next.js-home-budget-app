'use client'

import React, { useState } from 'react'
import ExpenseForm from '../expenseForm/ExpenseForm'
import Expenses from '../budgetDetails/expenses/Expenses'
import { BudgetType, Expense } from '@/lib/types'
import Button from '../button/Button'

const ExpensesContainer = ({budget, userId, expenses} : {budget: BudgetType, userId: string, expenses: Expense[]}) => {

  const [isShowDetailsOn, setIsShowDetailsOn] = useState(true);

  const toggleShowDetails = () => {
    setIsShowDetailsOn(prevState => !prevState)
  }

  return (
    <div>
      {isShowDetailsOn && 
      <Button 
        btnHtmlType={'button'}
        btnType={'info'}
        btnSize={'medium'}
        btnText={'Add new expense'}
        handleClick={() => toggleShowDetails()}
      />
      }
      {!isShowDetailsOn &&
      <Button 
        btnHtmlType={'button'}
        btnType={'info'}
        btnSize={'medium'}
        btnText={'Show expenses'}
        handleClick={() => toggleShowDetails()}
      />
      
      }
      {!isShowDetailsOn && <h4>Choose group to add a new expense.</h4>}
      {isShowDetailsOn && <h4>Choose group to display expense.</h4>}
      {/* <button onClick={toggleShowDetails}>Show expenses</button>} */}
      {!isShowDetailsOn && <ExpenseForm userId={userId} budgetId={budget._id} />}
      {isShowDetailsOn && <Expenses expenses={expenses} />}
    </div>
  )
}

export default ExpensesContainer