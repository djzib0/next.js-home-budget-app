// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import { BudgetType } from "@/lib/types";
import { findLatestBudgetName } from "@/lib/utils";
import { getAllBudgetsByUserId } from "@/lib/actions";
import BudgetsList from "@/components/budgetsList/BudgetsList";
import BudgetLink from "@/components/budgetsList/budgetLink/BudgetLink";

const getData = async (userId: string | undefined) => {
  // http://localhost:3000
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

  const allBudgets = await getAllBudgetsByUserId(session?.user?.id ? session.user.id : "")
  
  

  return (
    <div className={styles.container}>
      {latestBudget && <h3>Latest:</h3>}
      {latestBudget && 
      <BudgetLink 
        budget={latestBudget}
        linkTo={`/budgets/${latestBudget?.budgetName}`}
      />}
      {budgets.length > 1 && <h3>Other:</h3>}
      <BudgetsList budgets={allBudgets} />
    </div>
  )
}

export default BudgetsPage