import { ModalType } from "@/lib/types"
import { useEffect, useState } from "react"

const useModal = () => {

  // set initial data to easily reset modal
  const initialModalData: ModalType = {
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    errorText: "",
    handleFunction: () => {},
    form: <p></p>,
    refreshFunc: () => {}
  }

  // state variables
  const [modalData, setModalData] = useState<ModalType>(initialModalData)

  useEffect(() => {
  },[modalData])

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