'use client'
import dynamic from "next/dynamic";
import { PlotParams } from "react-plotly.js";
import { BudgetType } from "@/lib/types"
import { convertBudgetDataToChartData, convertBudgetToAggregatedChartData } from "@/lib/utils";
import useToggle from "@/customHooks/useToggle";


const BudgetChart = ({budget} : {budget: BudgetType}) => {

  const {isOn, toggle} = useToggle();
  const budgetData = convertBudgetDataToChartData(budget);
  const aggregatedData = convertBudgetToAggregatedChartData(budget);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Plot: PlotParams | any = dynamic(() => import("react-plotly.js"), { ssr: false, })
  return (
    <div>
      <button onClick={toggle}>Toggle detailed chart</button>
      {aggregatedData && !isOn && <Plot
        data={aggregatedData}
        layout={
          {
            autosize: true,
            width: 500,
            height: 500,
            showlegend: false,
            title: "Budget",
            // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            automargin: true,
            displayModeBar: true,
            paper_bgcolor: "transparent"
          }
        }  
      />}
      {budgetData && isOn && <Plot
        data={budgetData}
        layout={
          {
            autosize: true,
            width: 500,
            height: 500,
            showlegend: false,
            title: "Budget",
            // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            automargin: true,
            displayModeBar: true,
            paper_bgcolor: "transparent"
          }
        }  
      />}
    </div>
  )
}

export default BudgetChart