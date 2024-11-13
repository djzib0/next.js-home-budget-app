import BudgetForm from '@/components/budgetForm/BudgetForm';
import { getBudgetByUserIdAndBudgetName } from '@/lib/actions';
import { auth } from '@/lib/auth';
import React from 'react'

const EditBudgetPage = async ({params} : {params: Promise<{budgetNameSlug: string}>}) => {

  const {budgetNameSlug} = await params;

  const session = await auth();
  const budget = session && await getBudgetByUserIdAndBudgetName(session.user?.id ? session.user.id : "", budgetNameSlug)
  return (
    <div>
        {session && <BudgetForm session={session} defaultValues={budget} />}
    </div>
  )
}

export default EditBudgetPage