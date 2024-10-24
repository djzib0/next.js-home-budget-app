// styles import
import { ExpenseGroup } from "@/lib/enums";
import styles from "./expenseGroupButton.module.css";

type ExpenseGroupButtonPropsType = {
  title: string;
  groupName: string;
  expenseGroup: ExpenseGroup
  isOn: boolean;
  entriesNumber: number;
  value: number;
  handleClick: () => void;
}

const ExpenseGroupButton = ({title, groupName, expenseGroup, isOn, entriesNumber, value, handleClick} : ExpenseGroupButtonPropsType) => {

  return (
    <button className={
      `${isOn && groupName === expenseGroup ? styles.active : styles.toggleBtn}`
    }
    onClick={handleClick}
    >
      <div>
        {title}
      </div>
      <div className={styles.stats}>
        <div>
          <p className={styles.statsTitle}>Entries:</p>
          <p className={styles.statsTitle}>Value:</p>
        </div>
        <div>
          <p className={styles.entriesCounter}>{entriesNumber}</p>
          <p className={styles.value}>{value}$</p>
        </div>
      </div>
    </button>
  )
}

export default ExpenseGroupButton