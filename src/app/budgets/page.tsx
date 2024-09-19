// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import BudgetsForm from "@/components/budgetsForm/BudgetsForm";

const BudgetsPage = async () => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <p>{session?.user?.id}</p>
      {session && <BudgetsForm session={session} />}
    </div>
  )
}

export default BudgetsPage