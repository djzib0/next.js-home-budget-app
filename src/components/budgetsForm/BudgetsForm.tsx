'use client'
import { createNewBudget } from '@/lib/actions'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

const BudgetsForm = ({session} : {session: Session}) => {

  const [state, formAction] = useFormState(createNewBudget, undefined)

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [state, router])

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={session?.user?.id}/>
      <button>Add new budget, HOMIE!</button>
    </form>
  )
}

export default BudgetsForm