import { Expense } from '@/lib/types';
import React from 'react';

const Expenses = async ({expenses} : {expenses: Expense[]}) => {

  const expensesArr = expenses.map((expense: Expense) => (
    <div key={expense.id}>
      {expense.value} - {expense.group}
    </div>
  ))
  return (
    <div>
      {expenses && expensesArr}
    </div>
  )
}

export default Expenses