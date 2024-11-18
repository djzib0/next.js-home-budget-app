"use client"

import styles from "./loginForm.module.css";
import { handleFacebookLogin, handleGoogleLogin, login } from "@/lib/actions";
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import Link from "next/link";
// icons import
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";

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
      <div className={styles.providersLoginContainer}>
        <p>Or login with</p>
        <div className={styles.providersBtnsContainer}>
          <button 
            className={styles.providerBtn} 
            id={styles.facebookLoginBtn}
            onClick={handleFacebookLogin}
            >
            <div className={styles.providerBtnIcon}><ImFacebook2 /></div>
            <div className={styles.providerBtnText}>Facebook</div>
          </button>
          <button 
            className={styles.providerBtn} 
            id={styles.googleLoginBtn}
            onClick={handleGoogleLogin}
          >
            <div className={styles.providerBtnIcon}><FcGoogle /></div>
            <div className={styles.providerBtnText}>Google</div>
          </button>
        </div>
      </div>
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