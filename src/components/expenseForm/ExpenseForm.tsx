'use client'
import { addExpense } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { ExpenseFormType } from '@/lib/types'
import { ClothesExpense, DigitalServicesExpense, FoodExpense, HealthExpense, HobbyExpense, HomeExpense, OtherExpense, TransportExpense } from '@/lib/enums';
import styles from './expenseForm.module.css'

// create an option list from Expense enum
const foodExpensesOptionsArr = Object.keys(FoodExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={FoodExpense[`${expense as keyof typeof FoodExpense}`]}
    >
      {FoodExpense[`${expense as keyof typeof FoodExpense}`]}
    </option>
  )
})

const healthExpensesOptionsArr = Object.keys(HealthExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={HealthExpense[`${expense as keyof typeof HealthExpense}`]}
    >
      {HealthExpense[`${expense as keyof typeof HealthExpense}`]}
    </option>
  )
})

const transportExpensesOptionsArr = Object.keys(TransportExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={TransportExpense[`${expense as keyof typeof TransportExpense}`]}
    >
      {TransportExpense[`${expense as keyof typeof TransportExpense}`]}
    </option>
  )
})


const clothesExpensesOptionsArr = Object.keys(ClothesExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={ClothesExpense[`${expense as keyof typeof ClothesExpense}`]}
    >
      {ClothesExpense[`${expense as keyof typeof ClothesExpense}`]}
    </option>
  )
})

const homeExpensesOptionsArr = Object.keys(HomeExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={HomeExpense[`${expense as keyof typeof HomeExpense}`]}
    >
      {HomeExpense[`${expense as keyof typeof HomeExpense}`]}
    </option>
  )
})

const digitalServicesExpenseOptionsArr = Object.keys(DigitalServicesExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={DigitalServicesExpense[`${expense as keyof typeof DigitalServicesExpense}`]}
    >
      {DigitalServicesExpense[`${expense as keyof typeof DigitalServicesExpense}`]}
    </option>
  )
})

const hobbyExpensesOptionsArr = Object.keys(HobbyExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={HobbyExpense[`${expense as keyof typeof HobbyExpense}`]}
    >
      {HobbyExpense[`${expense as keyof typeof HobbyExpense}`]}
    </option>
  )
})

const otherExpensesOptionsArr = Object.keys(OtherExpense).map((expense, index) => {
  return (
    <option
      key={index}
      value={OtherExpense[`${expense as keyof typeof OtherExpense}`]}
    >
      {OtherExpense[`${expense as keyof typeof OtherExpense}`]}
    </option>
  )
})

enum ExpenseGroup {
  Food = 'food',
  Health = 'health',
  Transport = 'transport',
  Clothes = 'clothes',
  Home = 'home',
  DigitalServices = 'digitalServices',
  Hobby = 'hobby',
  Other = 'other',
}

type ExpenseForm = {
  isOn: boolean;
  expenseGroup: string;
}

const ExpenseForm = ({userId, budgetId} : {userId: string, budgetId: string}) => {

  const [isExpenseFormOn, setIsExpenseFormOn] = useState<ExpenseForm>({
    isOn: true,
    expenseGroup: ""
  });


  const [formData, setFormData] = useState<ExpenseFormType>(
    {
      userId: userId,
      budgetId: budgetId,
      name: "",
      value: 0,
      group: "",
    }
  )

  const resetForm = () => {
    const newData = {
      userId: userId,
      budgetId: budgetId,
      name: "",
      value: 0,
      group: "",
    }
    setFormData(newData);
  }

  // toggle form to add expense (when it's off it's hidden)
  const toggleAddExpenseForm = (expenseGroup: ExpenseGroup) => {
    if (!isExpenseFormOn.isOn) {
      const newState: {isOn: boolean, expenseGroup: string} = {
        isOn: true,
        expenseGroup: expenseGroup,
      }
      setIsExpenseFormOn(newState);
    } else if (isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup != expenseGroup) {
      const newState: {isOn: boolean, expenseGroup: string} = {
        isOn: true,
        expenseGroup: expenseGroup,
      } 
      setIsExpenseFormOn(newState);
    } else {
      setIsExpenseFormOn(prevState => {
        return {
          ...prevState,
          isOn: false
        }
      })
    }
  }

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
    resetForm();
    router.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router])

  console.log(isExpenseFormOn.expenseGroup === 'health', " current group")

  return (
    <div className={styles.expenseFormContainer}>
      <p>Choose group to add a new expense.</p>
      <div className={styles.expenseFormButtons}>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Food)}
        >
          FOOD
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'health' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Health)}
        >
          HEALTH
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Transport)}
        >
          TRANSPORT
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Clothes)}
        >
          CLOTHES
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Home)}
        >
          HOME
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.DigitalServices)}
        >
          DIGITAL
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Hobby)}
        >
          HOBBY
        </button>
        <button 
          className={styles.toggleBtn}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Other)}
        >
          OTHER
        </button>
      </div>
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
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor='group'>Group</label>
        <select
          id='group'
          onChange={handleChange}
          name='group'
        >
        <option value={""}>---</option>
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Food && foodExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Health && healthExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Transport && transportExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Clothes && clothesExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Home && homeExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.DigitalServices && digitalServicesExpenseOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Hobby && hobbyExpensesOptionsArr}
        {isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === ExpenseGroup.Other && otherExpensesOptionsArr}
        </select>
        <br/>
        {formData.group && formData.value > 0 && <button>Add new Expense</button>}
      </form>
    </div>
  )
}

export default ExpenseForm