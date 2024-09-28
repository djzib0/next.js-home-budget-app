'use client'
// @ts-expect-error this library does not have declared types
import Plot from 'react-plotly.js';

import { BudgetType } from "@/lib/types"
import { convertBudgetDataToChartData } from "@/lib/utils";

const BudgetChart = ({budget} : {budget: BudgetType}) => {

  const budgetData = convertBudgetDataToChartData(budget);
  console.log(budgetData)
  return (
    <div>
     {budgetData && <Plot
        data={budgetData}
        layout={
          {
            opacity: 1,
            title: 'Budget', 
            showlegend: false,
            margin: {"t": 100, "b": 100, "l": 0, "r": 0},
          }
        }  
      />}
    </div>
  )
}

export default BudgetChart