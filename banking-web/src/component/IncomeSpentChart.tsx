import { useState } from "react"
import BarChartComponent from "./helper/ChartHelper"
import ButtonComponent from "./utils/ButtonComponent"

export default function IncomeSpentchart() {
    const [activeTab, setActiveTab] = useState('Income')
    const buttonclassName = "bg-purple-100 text-purple-700 py-2 px-5 hover:bg-purple-200 hover:text-purple-800"
    const activeButtonclassName = "bg-purple-700 text-purple-100 py-2 px-5 hover:bg-purple-800 hover:text-purple-200"

    const xAxis = [
        {
          id: 'barCategories',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        },
    ]
    

    const IncomeData = [10000,15000,14000,12000,20000,21000]
    const SpentData = [11000,13000,15000,14000,21500,16500]

    return <div className="rounded-3xl w-full shadow-md bg-white px-5 py-3">
        <div className="flex gap-4 mb-3">
            <ButtonComponent text="Income" onButtonClick={() => setActiveTab('Income')} className={activeTab === "Income" ? activeButtonclassName : buttonclassName}/>
            <ButtonComponent text="Spent" onButtonClick={() => setActiveTab('Spent')} className={activeTab === "Spent" ? activeButtonclassName : buttonclassName}/>
        </div>
        <BarChartComponent xAxis={xAxis} series={[ { data : activeTab === 'Income' ? IncomeData : SpentData} ]}/>
    </div> 
}