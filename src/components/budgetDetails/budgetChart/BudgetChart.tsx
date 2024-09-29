'use client'
import dynamic from "next/dynamic";
import { PlotParams } from "react-plotly.js";
import { BudgetType } from "@/lib/types"
import { convertBudgetDataToChartData } from "@/lib/utils";


const BudgetChart = ({budget} : {budget: BudgetType}) => {
  
  const budgetData = convertBudgetDataToChartData(budget);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Plot: PlotParams | any = dynamic(() => import("react-plotly.js"), { ssr: false, })
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