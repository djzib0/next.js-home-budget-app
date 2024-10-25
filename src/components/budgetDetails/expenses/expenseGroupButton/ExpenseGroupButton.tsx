// styles import
import styles from "./expenseGroupButton.module.css";

type ExpenseGroupButtonPropsType = {
  title: string;
  groupName: string;
  expenseGroup: string;
  isOn: boolean;
  entriesNumber: number;
  value: number;
  handleClick: () => void;
}

const ExpenseGroupButton = ({title, groupName, expenseGroup, isOn, entriesNumber, value, handleClick} : ExpenseGroupButtonPropsType) => {

  groupName === expenseGroup && console.log(styles['active'])
  return (
    <button className={
      `${isOn && groupName === expenseGroup ? styles.active : styles.toggleBtn}`
    }
    onClick={handleClick}
    >
      <div className={styles.buttonTitle}>
        {title.toUpperCase()}
      </div>
      <div className={styles.stats}>
          <p className={styles.statsTitle}>Entries:</p>
          <p className={styles.entriesCounter}>{entriesNumber}</p>
          <p className={styles.statsTitle}>Value:</p>
          <p className={styles.value}>{value}$</p>
      </div>
    </button>
  )
}

export default ExpenseGroupButton