'use client'
import { addComment, createNewBudget } from '@/lib/actions'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

const BudgetsForm = ({session} : {session: Session}) => {

  const [state, formAction] = useFormState(createNewBudget, undefined)

  const [commentState, commentFormAction] = useFormState(addComment, undefined);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [state, commentState, router])

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="userId" value={session?.user?.id}/>
        <button>Add new budget, HOMIE!</button>
      </form>
      <form action={commentFormAction}>
        <input type='hidden' name='budgetId' value={'66efd1a51d3e87d3dbb08bf1'} />
        <button>Add comment</button>
      </form>
    </>
  )
}

export default BudgetsForm