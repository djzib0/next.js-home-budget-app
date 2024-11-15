'use client'

import { BudgetType } from '@/lib/types';
import { useEffect, useState } from 'react';
// styles import
import styles from "./budgetsList.module.css";
// icons import
import { GoSearch } from "react-icons/go";
import { convertCurrentYearToNumber, convertMonthAndYearToBudgetName } from '@/lib/utils';
import BudgetLink from './budgetLink/BudgetLink';
import Button from '../button/Button';
import Link from 'next/link';


const BudgetsList = ({budgets} : {budgets: BudgetType[]}) => {

  // state variables
  const [filterForm, setFilterForm] = useState<{budgetNameMonth: string; budgetNameYear: string}>({
    budgetNameMonth: "",
    budgetNameYear: new Date().getFullYear().toString()
  });

  const [isShowAllOn, setIsShowAllOn] = useState(true);
  const [isSearchFilterOn, setIsSearchFilterOn] = useState(false);

  useEffect(() => {
    setIsShowAllOn(true);
  }, [])

  const toggleSearchFilter = () => {
    setIsSearchFilterOn(prevState => !prevState)
    setIsShowAllOn(prevState => !prevState)
  }

  // create an array with option to select year
  // set to current year
  // the "oldest" year is 2000 for people who would like
  // to go back with their old budgets from the past
  const yearOptionsArray: JSX.Element[] = []
  for (let i=convertCurrentYearToNumber(); i >= 2000; i--) {
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

  const filteredBudget = budgets.filter((budget) => {
    if (!filterForm.budgetNameMonth) {
      return budget.budgetName.slice(0, 2) === filterForm.budgetNameYear.slice(2)
    }
    return (
      budget.budgetName === convertMonthAndYearToBudgetName(filterForm.budgetNameMonth, filterForm.budgetNameYear)

    )
  })
  .map(budget => {
    return (
      <BudgetLink
        key={budget._id}
        budget={budget}
        linkTo={`budgets/${budget.budgetName}`}
      />
    )
  })

  const allBudgetsArr = sortedBudgetsArr.map((budget: BudgetType) => {
    return (
      <BudgetLink
        key={budget._id}
        budget={budget}
        linkTo={`budgets/${budget.budgetName}`}
      />
    )
  })

  return (
    <div className={styles.budgetsListContainer}>
      <div className={styles.buttonsContainer}>
        <Link href={"/budgets/add"}>
              <Button 
              btnHtmlType={'button'}
              btnType={'info'}
              btnSize={'large'}
              btnText={'Add new budget'}
              />
        </Link>
        <div className={styles.searchFormContainer}>
          <button 
            onClick={toggleSearchFilter}
            className={styles.searchButton}
          >
            <div className={styles.searchButtonTitle}>FILTER</div>
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
                  <option value={""}>---</option>
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
      </div>
      <div className={styles.budgetLinksContainer}>
        {isSearchFilterOn && filteredBudget}
        {isSearchFilterOn && filterForm.budgetNameMonth === "" && filteredBudget.length === 0 &&
        <p>There is no budget for the selected date.</p>}
        {isSearchFilterOn && filteredBudget.length === 0 && 
        filterForm.budgetNameMonth != "" &&
        <p>There is no budget for the selected date.</p>}
        {isShowAllOn && allBudgetsArr}
      </div>
    </div>
  )
}

export default BudgetsList