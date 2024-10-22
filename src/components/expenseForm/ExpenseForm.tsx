'use client'
import { addExpense, editExpense } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { ExpenseFormType } from '@/lib/types'
import { ClothesExpense, DigitalServicesExpense, ExpenseGroup, FoodExpense, HealthExpense, HobbyExpense, HomeExpense, OtherExpense, TransportExpense } from '@/lib/enums';
import styles from './expenseForm.module.css'
import { setExpenseGroup } from '@/lib/utils'

type ExpenseForm = {
  isOn: boolean;
  expenseGroup: string | undefined;
}

// Component
const ExpenseForm = ({userId, budgetId, defaultValues, closeFunction} : {userId: string, budgetId: string, defaultValues?: ExpenseFormType, closeFunction?: () => void;}) => {

  // state variables
  const [isExpenseFormOn, setIsExpenseFormOn] = useState<ExpenseForm>({
    isOn: false,
    expenseGroup: "",
  });

  const [formData, setFormData] = useState<ExpenseFormType>(
    {
      userId: userId,
      budgetId: budgetId,
      name: defaultValues ? defaultValues.name : "",
      value: defaultValues ? defaultValues.value : 0,
      group: defaultValues ? defaultValues.group : "",
    }
  )

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


  useEffect(() => {
    if (defaultValues) {
      setIsExpenseFormOn(
        {
          isOn: true,
          expenseGroup: setExpenseGroup(defaultValues)?.mainGroup,
          
        }
      )
    }
  }, [defaultValues])


  const resetForm = () => {
    const newData = {
      userId: userId,
      budgetId: budgetId,
      name: defaultValues ? defaultValues.name : "",
      value: defaultValues ? defaultValues.value : 0,
      group: defaultValues ? defaultValues.group : "",
    }
    setFormData(newData);
    setIsExpenseFormOn(prevState => {
      return {...prevState, isOn: false}
    });
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (prevState: any, formData: any) => {
    if (defaultValues) {
      editExpense(prevState, formData);
      resetForm();
      if (closeFunction) closeFunction();
    } else {
      addExpense(prevState, formData);
      resetForm()
    }
  }
  
  const [state, formAction] = useFormState(handleSubmit, undefined
  )

  const router = useRouter();

  useEffect(() => {
    if (!defaultValues) resetForm();
    router.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router])

  return (
    <div className={styles.expenseFormContainer}>
      <p>Choose group to add a new expense.</p>
      <div className={styles.expenseFormButtons}>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'food' ? styles.active : styles.toggleBtn}`}
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
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'transport' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Transport)}
          >
          TRANSPORT
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'clothes' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Clothes)}
          >
          CLOTHES
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'home' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Home)}
          >
          HOME
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'digitalServices' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.DigitalServices)}
          >
          DIGITAL
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'hobby' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Hobby)}
          >
          HOBBY
        </button>
        <button 
          className={`${isExpenseFormOn.isOn && isExpenseFormOn.expenseGroup === 'other' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Other)}
        >
          OTHER
        </button>
      </div>
      {isExpenseFormOn.isOn && 
      <form 
        action={formAction}
        className={isExpenseFormOn.isOn && styles.expenseForm}
      >
        <input 
          type='hidden'
          name='expenseId'
          value={defaultValues?._id}
          onChange={handleChange}
        />
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
          step={0.01}
          name='value'
          value={formData.value}
          onChange={handleChange}
        />
        <label htmlFor='name'>Name</label>
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
          defaultValue={defaultValues && defaultValues.group}
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
        {formData.group && formData.value > 0 && !defaultValues && <button>Add new Expense</button>}
        {defaultValues?.budgetId && defaultValues?.userId && <button>Confirm edit</button>}
        {defaultValues?.budgetId && defaultValues?.userId && <button type='button' onClick={closeFunction}>Cancel</button>}
      </form>}
    </div>
  )
}

export default ExpenseForm