'use client'

import { BudgetType } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { convertDateToBudgetName } from '@/lib/utils';
// styles import
import styles from "./budgetsList.module.css";
// import date picker
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const BudgetsList = ({budgets} : {budgets: BudgetType[]}) => {

  // state variables
  const [filterForm, setFilterForm] = useState("");

  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  // when the calendar value change, set new value
  // of filter form
  useEffect(() => {
    setFilterForm(convertDateToBudgetName(calendarValue) )
  }, [calendarValue])
  


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const {name, value, type} = e.target
  //   if ("checked" in e.target) {
  //     const checked = e.target.checked
  //     setFilterForm(prevFormData => {
  //       return {
  //         ...prevFormData,
  //         [name]: type === "checkbox" ? checked: value
  //       }
  //     })
  //   }
  //   setFilterForm(prevFormData => {
  //     return {
  //       ...prevFormData,
  //       [name]: type ===  value
  //     }
  //   })
  // }

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
      {filterForm}
      {isClient && <DatePicker 
        onChange={setCalendarValue} 
        value={calendarValue}
        maxDetail='year'
         />}
      {allBudgetsArr}
    </div>
  )
}

export default BudgetsList