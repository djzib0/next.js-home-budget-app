import { ModalEnumType } from "@/lib/enums";
//styles import
import styles from './modalIcon.module.css'
//icons imports
import { BsExclamationOctagonFill, BsFillInfoCircleFill } from 'react-icons/bs'

const ModalIcon = ({modalType}: {modalType: ModalEnumType}) => {

  return (
    <div>
      {
      (modalType === 'information' ||
      modalType === 'edit' ||
      modalType === 'confirm') && 
        <div className={styles[`modalIcon--${modalType}`]}>
          <BsFillInfoCircleFill /> 
        </div>
      }
      {
      (modalType === 'warning' ||
      modalType === 'error') && 
        <div className={styles[`modalIcon--${modalType}`]}>
          <BsExclamationOctagonFill />
        </div>
      }
    </div>
  )
}

export default ModalIcon