'use client'

import { registerNewUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./registerForm.module.css"

const RegisterForm = () => {

  // utilize useFormState with two parameters:
  // function, and initial state
  const [state, formAction] = useFormState(registerNewUser, undefined);

  // initialize router
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login")
  }, [state?.success, router ])

  return (
    <form className={styles.form} action={formAction}>
        <input type="text" placeholder="username" name="username"/>
        <input type="text" placeholder="email" name="email"/>
        <input type="password" placeholder="password" name="password"/>
        <input type="password" placeholder="password again" name="passwordRepeat"/>
        <button>Register</button>
        {state?.error}
        <Link href='/login' className={styles.link}>
          Have an account? <b>Login</b>
        </Link>
      </form>
  )
}

export default RegisterForm