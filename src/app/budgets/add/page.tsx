import BudgetsForm from '@/components/budgetsForm/BudgetsForm'
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