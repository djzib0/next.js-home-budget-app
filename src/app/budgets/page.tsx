// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import BudgetsForm from "@/components/budgetsForm/BudgetsForm";
import { BudgetType } from "@/lib/types";
import { findLatestBudget } from "@/lib/utils";

const getData = async (userId: string | undefined) => {
  if (userId) {
    const res = await fetch(`http://localhost:3000/api/budgets/${userId}`)
    
    if (!res.ok) {
      throw new Error("Something went wrong")
    } 
    return res.json()
  }
}

const BudgetsPage = async () => {

  const session = await auth();

  const budgets: BudgetType[] = await getData(session?.user?.id);

  const latestBudgetName = findLatestBudget(budgets)
  const latestBudget = budgets.find((budget) => budget.budgetName === latestBudgetName)

  return (
    <div className={styles.container}>
      <p>{session?.user?.id}</p>
      {session && <BudgetsForm session={session} />}
      {latestBudget && latestBudget.budgetName}
    </div>
  )
}

export default BudgetsPage