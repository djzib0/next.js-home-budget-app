'use client'

import { BudgetType } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// styles import
import styles from "./budgetsList.module.css";
// icons import
import { GoSearch } from "react-icons/go";


const BudgetsList = ({budgets} : {budgets: BudgetType[]}) => {

  // state variables
  const [filterForm, setFilterForm] = useState<{budgetNameMonth: string; budgetNameYear: string}>({
    budgetNameMonth: "01",
    budgetNameYear: new Date().getFullYear().toString()
  });

  const [isShowAllOn, setIsShowAllOn] = useState(true);
  const [isSearchFilterOn, setIsSearchFilterOn] = useState(false);

  useEffect(() => {
    setIsShowAllOn(true);
  }, [])

  const toggleSearchFilter = () => {
    setIsSearchFilterOn(prevState => !prevState)
  }

  // crete an array with option to select year
  // set to current year
  // the "oldest" year is 2000 for people who would like
  // to go back with their old budgets from the past
  const yearOptionsArray: JSX.Element[] = []
  for (let i=2000; i <= 2024; i++) {
    yearOptionsArray.push(
      <option
        key={`year-${i}`} 
        value={`${i}`}>{i}</option>
    )

  }

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
        [name]: value
      }
    })
  }

  const sortedBudgetsArr = budgets.sort((a: BudgetType, b: BudgetType) => parseInt(a.budgetName) - parseInt(b.budgetName))
  // const filteredBudget = budgets.filter((budget) => budget.budgetName.includes(filterForm))
  // const filteredBudget = budgets.filter((budget) => budget.budgetName === filterForm)
  // .map(budget => {
  //   return (
  //     <Link
  //       key={budget._id}
  //       href={`/budgets/${budget?.budgetName}`}
  //     >
  //       {budget.budgetName}
  //     </Link>
  //   )
  // })

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
      <div className={styles.searchFormContainer}>
        <button 
          onClick={toggleSearchFilter}
          className={styles.searchButton}
        >
          <div className={styles.searchButtonTitle}>SEARCH</div>
          <div>
            <GoSearch />
          </div>
        </button>
        {isSearchFilterOn && 
          <form 
            className={styles.filterForm}
          >
            <div className={styles.inputContainer}>
              <label htmlFor='budgetNameMonth'>Month:</label>
              <select
                className={styles.select}
                id='budgetNameMonth'
                value={filterForm.budgetNameMonth}
                onChange={handleChange}
                name='budgetNameMonth'
              >
                <option value={"01"}>January</option>
                <option value={"02"}>February</option>
                <option value={"03"}>March</option>
                <option value={"04"}>April</option>
                <option value={"05"}>May</option>
                <option value={"06"}>June</option>
                <option value={"07"}>July</option>
                <option value={"08"}>August</option>
                <option value={"09"}>September</option>
                <option value={"10"}>October</option>
                <option value={"11"}>November</option>
                <option value={"12"}>December</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor='budgetNameYear'>Year:</label>
              <select
                className={styles.select}
                id='budgetNameYear'
                value={filterForm.budgetNameYear}
                onChange={handleChange}
                name='budgetNameYear'
                >
                {yearOptionsArray}
              </select>
            </div>
          </form>
        }     
      </div>
      {isShowAllOn && allBudgetsArr}
    </div>
  )
}

export default BudgetsList