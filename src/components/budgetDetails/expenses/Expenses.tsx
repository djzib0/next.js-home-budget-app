'use client'
import { Expense, ExpenseDetails } from '@/lib/types';
import React, { useState } from 'react';
import styles from "./expenses.module.css"
import { setExpenseGroup } from '@/lib/utils';
import { ExpenseGroup, ModalEnumType } from '@/lib/enums';
import useModal from '@/customHooks/useModal';
import Modal from '@/components/modal/Modal';
import { deleteExpenseById } from '@/lib/actions';


const Expenses = ({expenses} : {expenses: Expense[]}) => {

  // utilize useModal custom hook
  const {
    setModalData,
    modalData,
  } = useModal();

  // state variables
  const [isDetailsOn, setIsDetailsOn] = useState<ExpenseDetails>({
    isOn: false,
    expenseGroup: "",
  })

  const expensesWithMainGroup = expenses && expenses.map((expense: Expense) => setExpenseGroup(expense))

  const expensesArr = expensesWithMainGroup && expensesWithMainGroup
  .filter((expense) => {
    if (expense) return expense.mainGroup === isDetailsOn.expenseGroup
  })
  .map((expense) => {
    if (expense)
    return (
      <div key={expense._id}>
        {expense?.name} - {expense?.mainGroup}
        <button onClick={() => setModalData({
          ...modalData,
          isActive: true,
          modalType: ModalEnumType.Warning,
          messageText: `Do you want to do delete an expense ${expense.name}?`,
          handleFunction: () => deleteExpenseById(expense._id),
        })}>Click me</button>
        
      </div>
    )
  })

  const toggleAddExpenseForm = (expenseGroup: ExpenseGroup) => {
    if (!isDetailsOn.isOn) {
      const newState: {isOn: boolean, expenseGroup: string} = {
        isOn: true,
        expenseGroup: expenseGroup,
      }
      setIsDetailsOn(newState);
    } else if (isDetailsOn.isOn && isDetailsOn.expenseGroup != expenseGroup) {
      const newState: {isOn: boolean, expenseGroup: string} = {
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
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'food' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Food)}
        >
          FOOD
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'health' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Health)}
          >
          HEALTH
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'transport' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Transport)}
          >
          TRANSPORT
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'clothes' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Clothes)}
          >
          CLOTHES
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'home' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Home)}
          >
          HOME
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'digitalServices' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.DigitalServices)}
          >
          DIGITAL
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'hobby' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Hobby)}
          >
          HOBBY
        </button>
        <button 
          className={`${isDetailsOn.isOn && isDetailsOn.expenseGroup === 'other' ? styles.active : styles.toggleBtn}`}
          onClick={() => toggleAddExpenseForm(ExpenseGroup.Other)}
        >
          OTHER
        </button>
      </div>
      {expenses && isDetailsOn.isOn && expensesArr}
      {/* {modalData.isActive &&  */}
        <Modal 
          isActive={modalData.isActive}
          modalType={modalData.modalType}
          messageTitle={modalData.messageTitle}
          messageText={modalData.messageText}
          errorText={modalData.errorText}
          handleFunction={modalData.handleFunction}
          form={<form></form>}
          refreshFunc={() => {}}
          closeFunction={modalData.closeFunction}
        />
      {/* } */}
    </div>
  )
}

export default Expenses