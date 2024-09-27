import BudgetsForm from '@/components/budgetForm/BudgetForm'
import { auth } from '@/lib/auth'
import React from 'react'

const AddBudgetPage = async () => {

  const session = await auth();

  return (
    <div>
      {session && <BudgetsForm session={session} />}
    </div>
  )
}

export default AddBudgetPage