import { BudgetType } from "@/lib/types"
import { convertBudgetNameToMonth, convertBudgetNameToYear, convertToMonthName, sumBudget, sumBudgetForMainGroup } from "@/lib/utils"
import Link from "next/link";
// import styles
import styles from "./budgetLink.module.css"
import { MonthNameLength } from "@/lib/enums";

const BudgetLink = ({budget, linkTo} : {budget: BudgetType; linkTo: string}) => {

  const budgetSummary = sumBudgetForMainGroup(budget);


  return (
    <Link 
      key={budget._id}
      href={linkTo}
     >
      <div className={styles.budgetLinkContainer}>
        <div className={styles.budgetLinkTitle}>
          <h2 className={styles.monthTitle}>
            {`${convertToMonthName(parseInt(convertBudgetNameToMonth((budget.budgetName))), "En-en", MonthNameLength.Long)}`}</h2>
          <h2 className={styles.yearTitle}>
            {`${convertBudgetNameToYear(budget.budgetName)}`}
          </h2>
        </div>
        <div className={styles.budgetLinkDetails}>
          <div className={styles.budgetSumContainer}>
            <p>Total: </p>
            <p>{sumBudget(budget)}</p>
          </div>
          <div className={styles.budgetDetails}>
            <div className={styles.budgetDetailsElement}>
              <p>Food:</p>
              <p>{budgetSummary.foodBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Health:</p>
              <p>{budgetSummary.healthBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Transport:</p>
              <p>{budgetSummary.transportBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Clothes:</p>
              <p>{budgetSummary.clothesBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Home:</p>
              <p>{budgetSummary.homeBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Digital:</p>
              <p>{budgetSummary.digitalServices}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Hobby:</p>
              <p>{budgetSummary.hobbyBudget}</p>
            </div>
            <div className={styles.budgetDetailsElement}>
              <p>Other:</p>
              <p>{budgetSummary.otherBudget}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BudgetLink