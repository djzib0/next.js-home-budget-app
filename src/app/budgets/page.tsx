// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import { BudgetType } from "@/lib/types";
import { findLatestBudgetName } from "@/lib/utils";
import Link from "next/link";

const getData = async (userId: string | undefined) => {
  if (userId) {
    const res = await fetch(`http://localhost:3000/api/${userId}/budgets`)
    
    if (!res.ok) {
      throw new Error("Something went wrong")
    } 
    return res.json()
  }
}

const BudgetsPage = async () => {

  const session = await auth();

  const budgets: BudgetType[] = await getData(session?.user?.id);

  const latestBudgetName = findLatestBudgetName(budgets)
  const latestBudget = budgets.find((budget) => budget.budgetName === latestBudgetName)

  return (
    <div className={styles.container}>
      <p>{session?.user?.id}</p>
      {latestBudget && latestBudget.budgetName}
      <Link href={"/budgets/add"}>Add new budget</Link>
    </div>
  )
}

export default BudgetsPage