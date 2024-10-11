import { Expense } from '@/lib/types';
import React, { useState } from 'react';
import styles from "./expenses.module.css"
import { ClothesExpense, DigitalServicesExpense, FoodExpense, HealthExpense, HobbyExpense, HomeExpense, OtherExpense, TransportExpense } from '@/lib/enums';

type ExpenseDetails = {
  isOn: boolean;
  expenseGroup: string[];
}

const Expenses = ({expenses} : {expenses: Expense[]}) => {


  const [isDetailsOn, setIsDetailsOn] = useState<ExpenseDetails>({
    isOn: false,
    expenseGroup: [],
  })

  const toggleShowDetails = (expenseGroup: string[]) => {
    if (!isDetailsOn.isOn) {
      const newState: ExpenseDetails = {
        isOn: true,
        expenseGroup: expenseGroup,
      }
      setIsDetailsOn(newState);
    } else if (isDetailsOn.isOn && isDetailsOn.expenseGroup != expenseGroup) {
      const newState: ExpenseDetails = {
        isOn: true,
        expenseGroup: expenseGroup,
      } 
      setIsDetailsOn(newState);
    } else {
      setIsDetailsOn(prevState => {
        return {
          ...prevState,
          isOn: false
        }
      })
    }
  }

  return (
    <div>
      <div className={styles.expenseFormButtons}>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup.includes === 'food' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(Object.keys(FoodExpense))}
        >
          FOOD
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'health' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Health)}
          >
          HEALTH
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'transport' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Transport)}
          >
          TRANSPORT
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'clothes' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Clothes)}
          >
          CLOTHES
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'home' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Home)}
          >
          HOME
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'digitalServices' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.DigitalServices)}
          >
          DIGITAL
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'hobby' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Hobby)}
          >
          HOBBY
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'other' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleShowDetails(ExpenseGroup.Other)}
        >
          OTHER
        </button>
      </div>
      {expenses && 
      expenses.filter((item) => item.group === 'Fuel')
      .map((expense) => <p>{expense.group}</p>)}
    </div>
  )
}

export default Expenses