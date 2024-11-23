'use client'
import { BudgetType } from '@/lib/types'
import Link from 'next/link';
import React from 'react';
import BudgetLink from '../budgetsList/budgetLink/BudgetLink';
import Button from '../button/Button';
// styles import
import styles from "./homePageContent.module.css"

const HomePageContent = ({currentBudget, userName} : {currentBudget: BudgetType; userName: string | undefined | null}) => {
  return (
    <div className={styles.homePageContainer}>
      {!currentBudget && 
        <div className={styles.noBudgetInfo}>
          <h3>{`Hi, ${userName}!`}</h3>
          <p>There is no budget set for this month.</p>
          <p>If you want to add budget for this month please click the button below.</p>
        </div>
      }
      {currentBudget && 
      <div>
        <h3>Budget for this month</h3>
        <BudgetLink
          budget={currentBudget}
          linkTo={`budgets/${currentBudget.budgetName}`}
        />
      </div>
      }
      <Link href={"/budgets/add"}>
        <Button 
        btnHtmlType={'button'}
        btnType={'info'}
        btnSize={'large'}
        btnText={'Add new budget'}
        />
      </Link>
    </div>
  )
}

export default HomePageContent