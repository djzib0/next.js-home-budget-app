import Image from "next/image";
// styles import
import styles from "./budgetSummary.module.css"

const BudgetSummary = ({budgetSum, expensesSum} : {budgetSum: number, expensesSum: number}) => {

  return (
    <div className={styles.budgetSummaryContainer}>
      <div className={styles.budgetSummary}>
        <h3>Budget</h3>
        <h3>&nbsp;</h3>
        <h3>Expenses</h3>
        <h3>&nbsp;</h3>
        <h3>Left</h3>
        <p className={styles.budgetSummaryText}>{budgetSum}</p>
        <p className={styles.budgetSummaryText}>-</p>
        <p className={styles.budgetSummaryText}>{expensesSum}</p>
        <p className={styles.budgetSummaryText}>=</p>
        {budgetSum - expensesSum >= 0 ?
          <p className={styles.positive}>{budgetSum - expensesSum}</p>:
          <p className={styles.negative} id="negative">{budgetSum - expensesSum}</p>
        }
      </div>
      <div className={styles.summaryIcon}>
        {budgetSum - expensesSum >= 0 ?
          <Image src={'/sun.png'} alt="sun icon" fill/>:
          <Image src={'/thunder.png'} alt="sun icon" fill/>
        }
      </div>
    </div>
  )
}

export default BudgetSummary