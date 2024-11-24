'use client'

// styles import
import styles from "./menuContainer.module.css";
import Link from "next/link";
import { handleLogout } from "@/lib/actions";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";

const MenuContainer = ({session} : {session: Session}) => {

  // state variables
  const [isMenuOn, setIsMenuOn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOn(prevState => !prevState);
  }

  //state variables
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.logoImgContainer}>
            <Image alt={'application logo with bee and app name'} src={'/logo.png'} fill />
          </div>
          <button 
            type="button" 
            className={`${styles['menuButton']} ${isMenuOn && styles['isOpened']}`} 
            aria-labelledby="menuButtonLabel"
            onClick={toggleMenu}
            >
              <span className={styles.menuButtonLine}>
              </span>
          </button>
        </div>
        {(isMenuOn || windowWidth >= 450) && <div className={styles.menuContainer}>
          <Link href={"/"}>Home</Link>
          <Link href={"/budgets"}>Budgets</Link>
          {session?.user && 
              <form action={handleLogout}>
                <button>Logout </button>
              </form>
          }
        </div>}
      </div>
    </nav>
  )
}

export default MenuContainer