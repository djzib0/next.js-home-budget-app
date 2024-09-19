// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import BudgetsForm from "@/components/budgetsForm/BudgetsForm";


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/budgets")

  if (!res.ok) {
    throw new Error("Something went wrong!")
  }

  return res.json();
}
const BudgetsPage = async () => {

  const budgets = await getData();

  console.log(budgets, "budgetssss")
  
  const session = await auth();

  return (
    <div className={styles.container}>
      <p>Above</p>
      {budgets && budgets.map((budget: {budgetId: string, id: string, budgetData: string}) =>{ 
        console.log(budget, " single budget")
        return <p key={budget.id}>k{budget.budgetData}</p>
        })}
      {/* {budgets && <p key={budgets.id}>{budgets.budgetData}</p>} */}
      <p>{session?.user?.id}</p>
      {session && <BudgetsForm session={session} />}
      <p>Below</p>
    </div>
  )
}

export default BudgetsPage