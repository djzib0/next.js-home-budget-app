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
    <div>
      <form className={styles.form} action={formAction}>
          <input type='text' placeholder='login' name='username' />
          <input type='password' placeholder='password' name='password' />
          <button>Login</button> 
          <Link href="/register" className={styles.link}>
        {"Don't Have an account?"} <b>Register</b>
      </Link>
        </form>
    </div>
  )
}

export default LoginForm