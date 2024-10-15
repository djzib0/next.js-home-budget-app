//styles imports
import styles from "./modalTitle.module.css";

const ModalTitle = ({modalTitle} : {modalTitle: string}) => {
  return (
    <div className={styles.modalTitleContainer}>
        {modalTitle}
    </div>
  )
}

export default ModalTitle