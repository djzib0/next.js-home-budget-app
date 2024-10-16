import { ModalEnumType } from "@/lib/enums"
import { ModalType } from "@/lib/types"
import { useState } from "react"

const useModal = () => {

  // set initial data to easily reset modal
  const initialModalData: ModalType = {
    isActive: false,
    modalType: ModalEnumType.Confirm,
    messageTitle: "",
    messageText: "",
    errorText: "",
    handleFunction: () => {},
    form: <p></p>,
    refreshFunc: () => {},
    closeFunction: () => closeModal(),
  }

  // state variables
  const [modalData, setModalData] = useState<ModalType>(initialModalData)

  // probably can be removed 
  // useEffect(() => {
  // },[modalData])

  const openModal = () => {
    setModalData(prevData => {
      return {
        ...prevData,
        isActive: true
      }
    })
  }

  const closeModal = () => {
    resetModal();
  }

  const resetModal = () => {
    setModalData(initialModalData);
  }


  return (
    {
      modalData,
      setModalData,
      closeModal,
      openModal,
      resetModal
    }
  )
}

export default useModal