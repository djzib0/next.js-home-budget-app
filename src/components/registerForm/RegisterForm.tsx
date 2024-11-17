'use client'

import { registerNewUser } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./registerForm.module.css"

const RegisterForm = () => {

  // utilize useActionState with two parameters:
  // function, and initial state
  const [state, formAction] = useActionState(registerNewUser, undefined);

  // initialize router
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login")
  }, [state?.success, router ])

  return (
    <div className={styles.registerFormContainer}>
      <h2 className={styles.formTitle}>REGISTER</h2>
      <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username"/>
        <input type="text" placeholder="email" name="email"/>
        <input type="password" placeholder="password" name="password"/>
        <input type="password" placeholder="password again" name="passwordRepeat"/>
        {state?.error && <p className={styles.errorMsg}>{state?.error}</p>}
        <button className={styles.btn}>Register</button> 
      </form>
      <div className={styles.registerContainer}>
        <p>Have an account?</p>
        <Link href="/login" className={styles.link}>
          <b>Log in</b>
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm