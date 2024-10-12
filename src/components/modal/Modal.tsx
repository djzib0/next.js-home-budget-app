import useModal from "@/customHooks/useModal"
import { ModalType } from "@/lib/types";


const Modal = (props: ModalType) => {

  // destructuring props
  const {
    isActive,
    modalType,
    messageText,
    messageTitle,
    errorText,
    handleFunction,
    form,
    refreshFunc,
  } = props;

  // utilize useModal custom hook
  const {
    modalData,
    closeModal,
  } = useModal();

  return (
    <div>
      {modalData.messageTitle}
      {modalData.messageText}
      <button onClick={handleFunction}>OK</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  )
}

export default Modal