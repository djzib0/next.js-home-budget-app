// styles import
import styles from "./modalMessageText.module.css";

const ModalMessageText = ({messageText} : {messageText: string}) => {
  return (
    <div className={styles.modalMessageTextContainer}>
        {messageText}
    </div>
  )
}

export default ModalMessageText