import { ModalType } from "@/lib/types";
// import styles
import styles from './modal.module.css'
import ModalIcon from "./modalIcon/ModalIcon";
import ModalTitle from "./modalTitle/ModalTitle";
import ModalMessageText from "./modalMessageText/ModalMessageText";
import ModalButtonsContainer from "./modalButtonsContainer/ModalButtonsContainer";

const Modal = (props: ModalType) => {

  // destructuring props
  const {
    // isActive,
    modalType,
    messageText,
    messageTitle,
    // errorText,
    // form,
    // refreshFunc,
    handleFunction,
    closeFunction
  } = props;

  const handleClick = () => {
    handleFunction();
    closeFunction();
  }


  console.log(modalType)
  return (
    <div className={styles.modalContainer}>
      <div className={styles[`modalBody--${modalType}`]}>
        <ModalIcon modalType={modalType} />
        <ModalTitle modalTitle={messageTitle} />
        <ModalMessageText messageText={messageText} />
        <ModalButtonsContainer 
          modalType={modalType} 
          handleClick={handleClick} 
          closeFunction={closeFunction}
        />
  
        <button className={styles[`closeBtn--${modalType}`]} onClick={closeFunction}>X</button>
      </div>
    </div>
  )
}

export default Modal