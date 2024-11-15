'use client'
import dynamic from "next/dynamic";
import { PlotParams } from "react-plotly.js";
import { BudgetType } from "@/lib/types"
import { convertBudgetDataToChartData, convertBudgetToAggregatedChartData, getIsNumberInRange } from "@/lib/utils";
import useToggle from "@/customHooks/useToggle";
// styles import
import styles from "./budgetChart.module.css"
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";


const BudgetChart = ({budget} : {budget: BudgetType}) => {

  //state variables
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const {isOn, toggle} = useToggle();
  const budgetData = convertBudgetDataToChartData(budget);
  const aggregatedData = convertBudgetToAggregatedChartData(budget);

  //chart width and height depends on screen width
  let chartWidth = 0;
  let chartHeight = 0;

  if (getIsNumberInRange(windowWidth, 0, 480)) {
    chartWidth = 400;
    chartHeight = 400;
  } else if (getIsNumberInRange(windowWidth, 481, 650)) {
    chartWidth = 450;
    chartHeight = 450;
  } else if (getIsNumberInRange(windowWidth, 651, 768)) {
    chartWidth = 450;
    chartHeight = 450;
  } else if (getIsNumberInRange(windowWidth, 769, 1024)) {
    chartWidth = 450;
    chartHeight = 450;
  } else if (getIsNumberInRange(windowWidth, 1025, 1201)) {
    chartWidth = 450;
    chartHeight = 450;
  } else {
    chartWidth = 450;
    chartHeight = 450;
  }
  

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Plot: PlotParams | any = dynamic(() => import("react-plotly.js"), { ssr: false, })
  return (
    <div className={styles.chartContainer}>
      <Button 
        btnHtmlType={'button'}
        btnText={'Show details'}
        btnSize={'small'}
        btnType={'action'}
        handleClick={toggle}
      />
      <div>
        {aggregatedData && !isOn && <Plot
          data={aggregatedData}
          layout={
            {
              autosize: true,
              width: chartWidth,
              height: chartHeight,
              showlegend: false,
              title: "Budget",
              // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
              automargin: true,
              paper_bgcolor: "transparent",
              font: {
                family: '"Open Sans", verdana, arial, sans-serif',
                size: 12,
                color: '#444'
              }
            }
          }
          config={
            {
              displayModeBar: false
            }
          }
          />}
      </div>
      {budgetData && isOn && <Plot
        data={budgetData}
        layout={
          {
            autosize: true,
            width: chartWidth,
            height: chartHeight,
            showlegend: false,
            title: "Budget",
            // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            automargin: true,
            displayModeBar: true,
            paper_bgcolor: "transparent"
          }
        }
        config={
          {
            displayModeBar: false
          }
        }
      />}
    </div>
  )
}

export default BudgetChart