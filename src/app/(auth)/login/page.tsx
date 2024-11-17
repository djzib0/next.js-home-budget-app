
import LoginForm from "@/components/loginForm/LoginForm"
import styles from "./login.module.css"
import Image from "next/image"

const LoginPage = async () => {

  return (
    <div className={styles.container}>
      <div className={styles.summaryIcon}>
        <Image src={'/piggybank.png'} alt="sun icon" fill/>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage