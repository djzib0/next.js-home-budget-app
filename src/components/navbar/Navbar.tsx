//styles import
import Link from "next/link"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth";
import { handleGitHubLogout } from "@/lib/actions";

const Navbar = async () => {

  const session = await auth();
  
  return (
    <div className={styles.container}>
      <Link href={"/"}>Home</Link>
      <Link href={"/budgets"}>Budgets</Link>
      {session?.user && <form action={handleGitHubLogout}>
        <button>Logout </button>
      </form>}
    </div>
  )
}

export default Navbar