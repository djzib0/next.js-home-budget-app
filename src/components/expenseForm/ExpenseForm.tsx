'use client'
import { addExpense } from '@/lib/actions'
import { ExpenseFormType } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

const ExpenseForm = ({userId, budgetId} : {userId: string, budgetId: string}) => {

  console.log(userId)
  console.log(budgetId)

  const [formData, setFormData] = useState<ExpenseFormType>(
    {
      userId: userId,
      budgetId: budgetId,
      value: 0,
      group: "TestGroup",
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value, type} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
      }
    })
  }
  
  const [state, formAction] = useFormState(addExpense, undefined)

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [state, router])


  return (
    <div>
      <form action={formAction}>
        <input 
        type='hidden'
        name='budgetId'
        value={formData.budgetId}
        onChange={handleChange}
        />
        <input 
        type='hidden'
        name='userId'
        value={formData.userId}
        onChange={handleChange}
        />
        <label htmlFor='value'>Value</label>
        <input 
        type='number'
        min={0}
        name='value'
        value={formData.value}
        onChange={handleChange}
        />
        <input 
        type='text'
        min={0}
        name='group'
        value={"testgroup123"}
        onChange={handleChange}
        />
        <button>Add new Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm