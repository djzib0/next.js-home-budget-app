'use client'
import { Expense, ExpenseDetails } from '@/lib/types';
import React, { useState } from 'react';
import styles from "./expenses.module.css"
import { setExpenseGroup } from '@/lib/utils';
import { ExpenseGroup, ModalEnumType } from '@/lib/enums';
import useModal from '@/customHooks/useModal';
import Modal from '@/components/modal/Modal';
import { deleteExpenseById } from '@/lib/actions';
import ExpenseForm from '@/components/expenseForm/ExpenseForm';
import ExpenseComponent from './expense/ExpenseComponent';
// icons import
import { FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";





const Expenses = ({expenses} : {expenses: Expense[]}) => {

  // utilize useModal custom hook
  const {
    setModalData,
    modalData,
    closeModal,
  } = useModal();

  // state variables
  const [isDetailsOn, setIsDetailsOn] = useState<ExpenseDetails>({
    isOn: false, // TODO: true is only for test, change to false afterwards
    expenseGroup: "", // TODO: food is only for test, change to "" afterwards
  })

  const expensesWithMainGroup = expenses && expenses.map((expense: Expense) => setExpenseGroup(expense))

  const expensesArr = expensesWithMainGroup && expensesWithMainGroup
  .filter((expense) => {
    if (expense) return expense.mainGroup === isDetailsOn.expenseGroup
  })
  .map((expense) => {
    if (expense)
    return (
      <tr key={expense._id}>
        <ExpenseComponent
          name={expense.name}
          group={expense.group}
        />
        <td className={styles.ctaTd}>
          <button onClick={() => setModalData({
            ...modalData,
            isActive: true,
            modalType: ModalEnumType.Edit,
            messageTitle: "Edit expense",
            form: 
              <ExpenseForm
                budgetId={expense.budgetId}
                userId={expense.userId}
                defaultValues={expense}
                closeFunction={closeModal}
              />
          })}><FaEdit /></button>
        </td>
        <td className={styles.ctaTd}>
          <button onClick={() => setModalData({
            ...modalData,
            isActive: true,
            modalType: ModalEnumType.Warning,
            messageText: `Do you want to do delete an expense - "${expense.name}"?`,
            handleFunction: () => deleteExpenseById(expense._id),
          })}><IoTrashOutline /></button>
        </td>
      </tr>
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
      <h4>Choose group to display expenses</h4>
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
      {isDetailsOn.isOn && expensesArr.length > 0 && 
        <table className={styles.expensesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th className={styles.groupTh}>Group</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expensesArr}
          </tbody>
        </table>
      }
      {isDetailsOn.isOn && expensesArr.length === 0 && 
        <h5>There are no expenses in this group.</h5>
      }
      {modalData.isActive && 
        <Modal 
          isActive={modalData.isActive}
          modalType={modalData.modalType}
          messageTitle={modalData.messageTitle}
          messageText={modalData.messageText}
          errorText={modalData.errorText}
          handleFunction={modalData.handleFunction}
          form={modalData.form}
          refreshFunc={() => {}}
          closeFunction={modalData.closeFunction}
        />
      }
    </div>
  )
}

export default Expenses