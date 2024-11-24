//styles import
import Link from "next/link"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth";
import { handleLogout } from "@/lib/actions";
import Image from "next/image";

const Navbar = async () => {

  const session = await auth();
  
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.logoImgContainer}>
            <Image alt={'application logo with bee and app name'} src={'/logo.png'} fill />
          </div>
        </div>
        {session?.user && <div className={styles.navbarRight}>
          <Link href={"/"}>Home</Link>
          <Link href={"/budgets"}>Budgets</Link>
          {session?.user && <form action={handleLogout}>
            <button>Logout </button>
          </form>}
        </div>}
        {!session?.user && <div className={styles.navbarRight}>
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
          {session?.user && <form action={handleLogout}>
            <button>Logout </button>
          </form>}
        </div>}      
      </div>
    </nav>
  )
}

export default Navbar