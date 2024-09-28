import { BudgetType } from "@/lib/types"
import { convertBudgetNameToDate } from "@/lib/utils"
import BudgetChart from "./budgetChart/BudgetChart"
import BudgetProgressBar from "./budgetProgressBar/BudgetProgressBar"

const BudgetDetails = ({budget} : {budget: BudgetType, userId: string}) => {

  return (
    <div>
      {budget &&
        <div>
          <p>Budget for {convertBudgetNameToDate(budget.budgetName, 'en-EN')}</p>
          <BudgetChart budget={budget}/>
          <BudgetProgressBar />
        </div>
      }
    </div>
  )
}

export default BudgetDetails