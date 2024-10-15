// styles import
import { ModalEnumType } from "@/lib/enums";
import styles from "./modalButtonsContainer.module.css"

const ModalButtonsContainer = ({modalType, handleClick, closeFunction} : {modalType: ModalEnumType; handleClick?: () => void; closeFunction: () => void}) => {

  console.log(modalType, " in modal Buttons")

  return (
    <div className={styles.modalButtonsContainer}>
      <button 
        onClick={handleClick}
        className={styles[`modalBtn--${modalType}`]}
      >
        OK
      </button>
      <button onClick={closeFunction}>Cancel</button>
    </div>
  )
}

export default ModalButtonsContainer