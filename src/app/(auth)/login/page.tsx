
import LoginForm from "@/components/loginForm/LoginForm"
import styles from "./login.module.css"

const LoginPage = async () => {

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  )
}

export default LoginPage