// styles import
import styles from "./button.module.css"

type ButtonPropsType = {
    btnHtmlType: "submit" | "reset" | "button" | undefined;
    btnType: string; // TODO: convert to enum
    btnText: string;
    btnSize: string; // TODO: convert to enum
    handleClick?: () => void;
}


const Button = ({btnHtmlType, btnType, btnText, btnSize, handleClick}: ButtonPropsType) => {
  return (
    <button
      type={btnHtmlType}
      className={styles.buttonContainer + " " + styles[btnType] + " " + styles[btnSize]}
      onClick={handleClick ? () => handleClick() : () => {}}
    >
      {btnText.toUpperCase()}
    </button>
  )
}

export default Button