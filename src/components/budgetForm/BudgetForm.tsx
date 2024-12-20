'use client'
import { createNewBudget, editBudget } from '@/lib/actions'
import { convertBudgetNameToMonth, convertBudgetNameToYear } from '@/lib/utils'
import { Session } from 'next-auth'
import { redirect, useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import styles from './budgetForm.module.css'
import { BudgetFormType } from '@/lib/types'
import Button from '../button/Button'

const BudgetForm = ({session, defaultValues} : {session: Session; defaultValues?: BudgetFormType}) => {

  const [formData, setFormData] = useState<BudgetFormType>(
    {
      budgetNameYear: defaultValues ? convertBudgetNameToYear(defaultValues.budgetName ? defaultValues.budgetName : "") : new Date().getFullYear(),
      budgetNameMonth: defaultValues ? convertBudgetNameToMonth(defaultValues?.budgetName ? defaultValues.budgetName : "") : "01",
      groceriesBudget: defaultValues ? defaultValues.groceriesBudget : 0,
      eatingOutBudget: defaultValues ? defaultValues.eatingOutBudget : 0,
      otherFoodAndDrinksBudget: defaultValues ? defaultValues.otherFoodAndDrinksBudget : 0,
      doctorsBudget: defaultValues ? defaultValues.doctorsBudget : 0,
      drugsBudget: defaultValues ? defaultValues.drugsBudget : 0,
      otherMedicalBudget: defaultValues ? defaultValues.otherMedicalBudget : 0,
      fuelBudget: defaultValues ? defaultValues.fuelBudget : 0,
      publicTransportBudget: defaultValues ? defaultValues.publicTransportBudget : 0,
      otherTransportBudget: defaultValues ? defaultValues.otherTransportBudget : 0,
      clothesHerBudget: defaultValues ? defaultValues.clothesHerBudget : 0,
      clothesHisBudget: defaultValues ? defaultValues.clothesHisBudget : 0,
      clothesKidsBudget: defaultValues ? defaultValues.clothesKidsBudget : 0,
      rentBudget: defaultValues ? defaultValues.rentBudget : 0,
      electricityBudget: defaultValues ? defaultValues.electricityBudget : 0,
      waterSupplyAndSewageBudget: defaultValues ? defaultValues.waterSupplyAndSewageBudget : 0,
      gasBudget: defaultValues ? defaultValues.gasBudget : 0,
      otherBillsBudget: defaultValues ? defaultValues.otherBillsBudget : 0,
      internetBudget: defaultValues ? defaultValues.internetBudget : 0, 
      phonesBudget: defaultValues ? defaultValues.phonesBudget : 0,
      streamingServicesBudget: defaultValues ? defaultValues.streamingServicesBudget : 0,
      otherDigitalServices: defaultValues ? defaultValues.otherDigitalServices : 0,
      hobbyBudget: defaultValues ? defaultValues.hobbyBudget : 0,
      otherBudget: defaultValues ? defaultValues.otherBudget : 0,
    }
  );

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
  const handleSubmit = (prevState: any, formData: FormData) => {
    if (defaultValues) {
      return editBudget(prevState, formData, defaultValues._id ? defaultValues._id : "", session.user?.id ? session.user.id : "");
    } else {
      return createNewBudget(prevState, formData);
    }
  }
  
  const [state, formAction] = useActionState(handleSubmit, undefined)

  const router = useRouter();

  
  useEffect(() => {
    if (defaultValues && state?.success) {
      redirect(`/budgets/${state.redirectPath}`)
    } else if (state?.success) {
      redirect('/budgets')
    }
    router.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router])


  return (
    <div className={styles.budgetFormContainer}>
      <p>{state?.error}</p>
      <form className={styles.formContainer} action={formAction}>
        <label 
          htmlFor='budgetNameMonth'
          className={state?.error && state?.error.includes("budgetName") ? styles.errorFont : ""}
        >
          Month
        </label>
        <select
          id='budgetNameMonth'
          name='budgetNameMonth'
          value={formData.budgetNameMonth}
          onChange={handleChange}
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
        <label 
          htmlFor='budgetNameYear'
          className={state?.error && state.error.includes("budgetName") ? styles.errorFont : ""}
        >
          Year
        </label>
        
        <input 
          type="number" 
          min="1900" 
          max="2099" 
          step="1" 
          name='budgetNameYear'
          value={formData.budgetNameYear}
          onChange={handleChange}
          id='budgetNameYear'
        />
        <label 
          htmlFor='groceriesBudget'
          className={state?.error && state.error.includes("groceriesBudget") ? styles.errorFont : ""}
        >Groceries budget</label>
        <input 
          type="number"  
          name='groceriesBudget'
          value={formData.groceriesBudget}
          onChange={handleChange}
          min={0}
        />
        <label 
          htmlFor='eatingOutBudget'
          className={state?.error && state.error.includes("eatingOutBudget") ? styles.errorFont : ""}
        >Eating out budget</label>
        <input 
          type="number"  
          name='eatingOutBudget'
          value={formData.eatingOutBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherFoodAndDrinksBudget'>Other food and drinks budget</label>
        <input 
          type="number"  
          name='otherFoodAndDrinksBudget'
          value={formData.otherFoodAndDrinksBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='doctorsBudget'>Doctor budget</label>
        <input 
          type="number"  
          name='doctorsBudget'
          value={formData.doctorsBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='drugsBudget'>Drugs budget</label>
        <input 
          type="number"  
          name='drugsBudget'
          value={formData.drugsBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherMedicalBudget'>Other medical budget</label>
        <input 
          type="number"  
          name='otherMedicalBudget'
          value={formData.otherMedicalBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='fuelBudget'>Fuel budget</label>
        <input 
          type="number"  
          name='fuelBudget'
          value={formData.fuelBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='publicTransportBudget'>Public transport budget</label>
        <input 
          type="number"  
          name='publicTransportBudget'
          value={formData.publicTransportBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherTransportBudget'>Other transport budget</label>
        <input 
          type="number"  
          name='otherTransportBudget'
          value={formData.otherTransportBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='clothesHerBudget'>Her clothes budget</label>
        <input 
          type="number"  
          name='clothesHerBudget'
          value={formData.clothesHerBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='clothesHisBudget'>His clothes budget</label>
        <input 
          type="number"  
          name='clothesHisBudget'
          value={formData.clothesHisBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='clothesKidsBudget'>Kids clothes budget</label>
        <input 
          type="number"  
          name='clothesKidsBudget'
          value={formData.clothesKidsBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='rentBudget'>Rent budget</label>
        <input 
          type="number"  
          name='rentBudget'
          value={formData.rentBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='electricityBudget'>Electricity budget</label>
        <input 
          type="number"  
          name='electricityBudget'
          value={formData.electricityBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='waterSupplyAndSewageBudget'>Water and sewage budget</label>
        <input 
          type="number"  
          name='waterSupplyAndSewageBudget'
          value={formData.waterSupplyAndSewageBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='gasBudget'>Gas budget</label>
        <input 
          type="number"  
          name='gasBudget'
          value={formData.gasBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherBillsBudget'>Other bills budget</label>
        <input 
          type="number"  
          name='otherBillsBudget'
          value={formData.otherBillsBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='internetBudget'>Internet budget</label>
        <input 
          type="number"  
          name='internetBudget'
          value={formData.internetBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='phonesBudget'>Phones budget</label>
        <input 
          type="number"  
          name='phonesBudget'
          value={formData.phonesBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='streamingServicesBudget'>Streaming services budget</label>
        <input 
          type="number"  
          name='streamingServicesBudget'
          value={formData.streamingServicesBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherDigitalServices'>Other digital budget</label>
        <input 
          type="number"  
          name='otherDigitalServices'
          value={formData.otherDigitalServices}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='hobbyBudget'>Hobbies budget</label>
        <input 
          type="number"  
          name='hobbyBudget'
          value={formData.hobbyBudget}
          onChange={handleChange}
          min={0}
        />
        <label htmlFor='otherBudget'>Others budget</label>
        <input 
          type="number"  
          name='otherBudget'
          value={formData.otherBudget}
          onChange={handleChange}
          min={0}
        />
        <input type='hidden' name='userId' value={session.user?.id} />
        <div className={styles.formButtonsContainer}>
          {!defaultValues && 
            <Button 
              btnHtmlType='submit'
              btnType='info'
              btnSize='medium'
              btnText={'SAVE'}
            />
          }
          {defaultValues && 
          <Button 
            btnHtmlType={'submit'}
            btnType={'info'}
            btnSize={'medium'}
            btnText={'EDIT'}
          />
          }
          <Button
            btnHtmlType={'button'}
            btnType={'cancel'}
            btnSize={'medium'}
            btnText={'cancel'}
            handleClick={() => router.back()}
          />
        </div>
      </form>
    </div>
  )
}

export default BudgetForm