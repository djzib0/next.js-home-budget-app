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
import ExpenseGroupButton from './expenseGroupButton/ExpenseGroupButton';





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

  const expensesStats = {
    'food' : {counter: 0, value: 0},
    'health' : {counter: 0, value: 0},
    'transport' : {counter: 0, value: 0},
    'clothes' : {counter: 0, value: 0},
    'home' : {counter: 0, value: 0},
    'digitalServices' : {counter: 0, value: 0},
    'hobby' : {counter: 0, value: 0},
    'other' : {counter: 0, value: 0},
  }
  
  const expensesWithMainGroup = expenses && expenses.map((expense: Expense) => setExpenseGroup(expense))

  // update expenses stats
  expensesWithMainGroup.forEach((expense) => {
    if (expense && expensesStats[expense?.mainGroup]) {
      expensesStats[expense.mainGroup].counter += 1
      expensesStats[expense.mainGroup].value += expense.value
    }
  })

  console.log(expensesStats.digitalServices.value)

  console.log(expensesWithMainGroup)

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
          value={expense.value}
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
      <div className={styles.expenseFormButtons}>
        <ExpenseGroupButton 
          title={'food'}
          groupName={'food'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.food.counter}
          value={expensesStats.food.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Food)}
        />
        <ExpenseGroupButton 
          title={'health'}
          groupName={'health'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.health.counter}
          value={expensesStats.health.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Health)}
        />
        <ExpenseGroupButton 
          title={'transport'}
          groupName={'transport'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.transport.counter}
          value={expensesStats.transport.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Transport)}
        />
        <ExpenseGroupButton 
          title={'clothes'}
          groupName={'clothes'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.clothes.counter}
          value={expensesStats.clothes.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Clothes)}
        />
        <ExpenseGroupButton 
          title={'home'}
          groupName={'home'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.home.counter}
          value={expensesStats.home.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Home)}
        />
        <ExpenseGroupButton 
          title={'digital'}
          groupName={'digitalServices'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.digitalServices.counter}
          value={expensesStats.digitalServices.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.DigitalServices)}
        />
        <ExpenseGroupButton 
          title={'hobby'}
          groupName={'hobby'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.hobby.counter}
          value={expensesStats.hobby.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Hobby)}
        />
        <ExpenseGroupButton 
          title={'other'}
          groupName={'other'}
          expenseGroup={isDetailsOn.expenseGroup}
          isOn={isDetailsOn.isOn}
          entriesNumber={expensesStats.other.counter}
          value={expensesStats.home.value}
          handleClick={() => toggleAddExpenseForm(ExpenseGroup.Other)}
        />

      </div>
      {isDetailsOn.isOn && expensesArr.length > 0 && 
        <table className={styles.expensesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th className={styles.groupTh}>Group</th>
              <th>Value</th>
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