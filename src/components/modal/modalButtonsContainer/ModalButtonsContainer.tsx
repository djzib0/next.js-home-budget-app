// styles import
import { ButtonEnumType, ModalEnumType } from "@/lib/enums";
import styles from "./modalButtonsContainer.module.css"
import ModalButton from "./modalButton/ModalButton";

const ModalButtonsContainer = ({modalType, handleClick, closeFunction} : {modalType: ModalEnumType; handleClick?: () => void; closeFunction: () => void}) => {

  return (
    <div className={styles.modalButtonsContainer}>
      {
      modalType === ModalEnumType.Warning && 
      <>
        <ModalButton 
          btnType={ButtonEnumType.WarningConfirm}
          btnText={"Yes"}
          handleFunction={handleClick ? handleClick : () => {}}
        />
        <ModalButton 
          btnType={ButtonEnumType.WarningCancel}
          btnText={"Cancel"}
          handleFunction={closeFunction}
        />
      </>
      }
      {
      modalType === ModalEnumType.Confirm && 
      <>
        <ModalButton 
          btnType={ButtonEnumType.Confirm}
          btnText={"OK"}
          handleFunction={handleClick ? handleClick : () => {}}
        />
        <ModalButton 
          btnType={ButtonEnumType.Cancel}
          btnText={"Cancel"}
          handleFunction={closeFunction}
        />
      </>
      }
      {
      modalType === ModalEnumType.Info && 
        <ModalButton 
          btnType={ButtonEnumType.Confirm}
          btnText={"OK"}
          handleFunction={closeFunction}
        />
      }
      {
      modalType === ModalEnumType.Error && 
        <ModalButton 
          btnType={ButtonEnumType.WarningCancel}
          btnText={"OK"}
          handleFunction={closeFunction}
        />
      }
    </div>
  )
}

export default ModalButtonsContainer