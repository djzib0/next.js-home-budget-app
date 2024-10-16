import { getProgressPercent } from "@/lib/utils";
// styles import
import styles from './progressBar.module.css'

const ProgressBar = ({currentProgress, maxValue} : {currentProgress: number, maxValue: number}) => {

  const completedProgressPercentage = getProgressPercent(currentProgress, maxValue)
  const notCompletedProgressPercentage = 100 - getProgressPercent(currentProgress, maxValue)

  console.log(completedProgressPercentage, "% completed ")
  const currentProgressTextPosition = completedProgressPercentage < 20 ? 'right' : 'left';

  
  return (
    <div>
      <div className={styles.progressBarContainer}>
        <p className={styles.percentageText}>0%</p>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressBarLeft}
            style={{width: `${completedProgressPercentage}%`}}
            >
            <p className={styles[`currentProgressText--${currentProgressTextPosition}`]
              }>{completedProgressPercentage}%</p>
            <p 
              className={styles.progressBarLeftTop}>
            &nbsp;</p>
            <p 
              className={styles.progressBarLeftBottom} >
            &nbsp;</p>
          </div>
          <p 
            className={styles.progressBarRight} 
            style={{width: `${notCompletedProgressPercentage}%`}}>
          &nbsp;</p>
        </div>
        <p className={styles.percentageText}>100%</p>
      </div>
    </div>
  )
}

export default ProgressBar