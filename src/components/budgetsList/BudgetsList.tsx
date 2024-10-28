'use client'

import { BudgetType } from '@/lib/types'
import Link from 'next/link'
// styles import
import styles from "./budgetsList.module.css"
import { useState } from 'react'


const BudgetsList = ({budgets} : {budgets: BudgetType[]}) => {

  // state variables
  const [filterForm, setFilterForm] = useState({
    budgetMonth: "",
    budgetYear: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFilterForm(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFilterForm(prevFormData => {
      return {
        ...prevFormData,
        [name]: type ===  value
      }
    })
  }

  const sortedBudgetsArr = budgets.sort((a: BudgetType, b: BudgetType) => parseInt(a.budgetName) - parseInt(b.budgetName))
  const allBudgetsArr = sortedBudgetsArr.map((budget: BudgetType) => {
    return (
      <Link
        key={budget._id}
        href={`/budgets/${budget?.budgetName}`}
      >
        {budget.budgetName}
      </Link>
    )
  })

  return (
    <div className={styles.budgetsListContainer}>
      <form>
        <input 
          type='text'
          placeholder=''
          onChange={handleChange}
         />
      </form>
      {allBudgetsArr}
    </div>
  )
}

export default BudgetsList