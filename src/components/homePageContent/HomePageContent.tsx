'use client'
import { BudgetType } from '@/lib/types'
import Link from 'next/link';
import React from 'react';

const HomePageContent = ({currentBudget} : {currentBudget: BudgetType}) => {

  return (
    <div>
      {!currentBudget && 
      <div>
        <p>There is no budget for this month</p>
        <p>Do you want to add budget for this month?</p>
        <Link href={'budgets/add'}>
          <button>Add new budget</button>
        </Link>
      </div>
      }
      {currentBudget && <p>{currentBudget.budgetName}</p>}
      {/* <Plot
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
      /> */}
    </div>
  )
}

export default HomePageContent