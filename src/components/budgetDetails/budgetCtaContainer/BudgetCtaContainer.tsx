'use client'

import Link from "next/link"
import { FaEdit } from "react-icons/fa"
import { IoTrashOutline } from "react-icons/io5"
import useModal from "@/customHooks/useModal"
// styles import
import styles from "./budgetCtaContainer.module.css"
import { ModalEnumType } from "@/lib/enums"
import Modal from "@/components/modal/Modal"
import { deleteBudgetById } from "@/lib/actions"

const BudgetCtaContainer = ({budgetName, budgetId} : {budgetName: string; budgetId: string}) => {

  // utilize useModal custom hook
  const {
    setModalData,
    modalData,
  } = useModal();

  const deleteBudget = async (budgetId: string) => {
    if (budgetId) {
      await deleteBudgetById(budgetId)
    }
  }

  return (
    <>
      <Link href={`/budgets/edit/${budgetName}`} className={styles.editBtn}>
        Edit <FaEdit/>
      </Link>
      <button 
        className={styles.deleteBtn}
        onClick={() => setModalData({
          ...modalData,
          isActive: true,
          modalType: ModalEnumType.Warning,
          messageText: 'Are you sure you want to delete this budget?',
          handleFunction: () => deleteBudget(budgetId)
        })}
      >
        Delete <IoTrashOutline />
      </button>
      {modalData.isActive && 
        <Modal
          isActive={modalData.isActive}
          modalType={modalData.modalType}
          messageTitle={modalData.messageTitle}
          messageText={modalData.messageText}
          errorText={modalData.errorText}
          handleFunction={modalData.handleFunction}
          form={modalData.form}
          refreshFunc={() => {}}
          closeFunction={modalData.closeFunction}
        />
      }
    </>
  )
}

export default BudgetCtaContainer