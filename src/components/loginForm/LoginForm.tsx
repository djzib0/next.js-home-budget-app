"use client"

import styles from "./loginForm.module.css";
import { login} from "@/lib/actions";
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import Link from "next/link";


const LoginForm = () => {

  const [state, formAction] = useActionState(login, undefined); 

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/")
    router.refresh();
  }, [state?.success, router])

  return (
    <div className={styles.loginFormContainer}>
      <h3 className={styles.formTitle}>LOGIN</h3>
      <form className={styles.form} action={formAction}>
        <input type='text' placeholder='login' name='username' />
        <input type='password' placeholder='password' name='password' />
        <button className={styles.btn}>Login</button> 
      </form>
      <div className={styles.registerContainer}>
        <p>Not a member?</p>
        <Link href="/register" className={styles.link}>
          <b>Register</b>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm