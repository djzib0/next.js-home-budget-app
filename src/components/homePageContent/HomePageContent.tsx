'use client'

import { BudgetType } from '@/lib/types'
import React from 'react';
// @ts-expect-error this library does not have declared types
import Plot from 'react-plotly.js';

const HomePageContent = ({currentBudget} : {currentBudget: BudgetType}) => {

  return (
    <div>
      {!currentBudget && <p>There is no budget for this month</p>}
      {currentBudget && 
      <p>{currentBudget.budgetName}</p>}
      <Plot
        data={[
          {
            values: [1, 2, 3],
            labels: ["Test1", "Test2", "Test3"],
            type: 'pie',
            textinfo: "label+percent",
            textposition: "outside",
            insidetextorientation: "radial",
          },
        ]}
        layout={
          {
            opacity: 1,
            title: 'A Fancy Plot', 
            showlegend: false,
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
          }
        }
      />
    </div>
  )
}

export default HomePageContent