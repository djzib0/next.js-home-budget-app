import Image from "next/image";
// styles import
import styles from "./budgetSummary.module.css"


const BudgetSummary = () => {
  return (
    <div>
        <div className={styles.summaryIcon}>
        <Image src={'/sun.png'} alt="sun icon" fill/>
      </div>
    </div>
  )
}

export default BudgetSummary