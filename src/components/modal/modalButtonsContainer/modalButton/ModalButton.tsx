import { ButtonEnumType } from '@/lib/enums'
// styles import
import styles from "./modalButton.module.css"

const ModalButton = ({btnType, btnText, handleFunction} : {btnType: ButtonEnumType, btnText: string; handleFunction: () => void }) => {

  console.log("button type", btnType)
  return (
    <button
      onClick={handleFunction}
      className={styles[`btn--${btnType}`]}
    >
      {btnText}
    </button>
  )
}

export default ModalButton