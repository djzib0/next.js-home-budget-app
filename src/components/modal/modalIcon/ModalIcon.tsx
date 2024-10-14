import { ModalEnumType } from "@/lib/enums";
//styles import
import styles from './modalIcon.module.css'
//icons imports
import { BsExclamationOctagonFill, BsFillInfoCircleFill } from 'react-icons/bs'

const ModalIcon = ({modalType}: {modalType: ModalEnumType}) => {

  return (
    <div>
      {modalType === 'information' && 
        <div className={styles[`modalIcon--${modalType}`]}>
          <BsFillInfoCircleFill /> 
        </div>
      }
      {modalType === 'warning' && 
        <div className={styles[`modalIcon--${modalType}`]}>
          <BsFillInfoCircleFill />
        </div>
      }
    </div>
  )
}

export default ModalIcon