//styles import
import Link from "next/link"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth";
import { handleGitHubLogout } from "@/lib/actions";

const Navbar = async () => {

  const session = await auth();
  
  return (
    <nav className={styles.container}>
      <div className={styles.navbarLeft}>
        Logo
      </div>
      {session?.user && <div className={styles.navbarRight}>
        <Link href={"/"}>Home</Link>
        <Link href={"/budgets"}>Budgets</Link>
        {session?.user && <form action={handleGitHubLogout}>
          <button>Logout </button>
        </form>}
      </div>}
      {!session?.user && <div className={styles.navbarRight}>
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        {session?.user && <form action={handleGitHubLogout}>
          <button>Logout </button>
        </form>}
      </div>}
    </nav>
  )
}

export default Navbar