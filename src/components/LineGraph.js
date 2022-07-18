import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
// import numeral from 'numeral';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import './LineGraph.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

const options = {
    responsive: true
  };

const LineGraph = () => {
    const [data, setData] = useState({})

    const buildChartData = (data, caseType = 'cases') => {
        const chartData = [];
        let lastDataPoint;

        for (const date in data[caseType]) {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[caseType][date]
        }
        return chartData
    }

    useEffect(() => {
        const fetchDatewiseData = async () => {
            const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
            const data = await res.json()
            console.log("hello",data)
            const chartData = buildChartData(data)
            // console.log("chartdata",chartData)
            setData(chartData)
        }
        
        fetchDatewiseData();
    }, [])
    // console.log("data",data)
  return (
    <div>
        {data?.length > 0 && 
        <Line data={{
            datasets: [
                {
                    backgroundColor: 'blue',
                    borderColor: 'red',
                    tension: 0.2,
                    data: data
                }
            ]
        }}
        options = {options}
        />}
    </div>
  )
}

export default LineGraph

// const obj = {
//     a: {
//         name: 'souvik',
//         age: 23
//     },
//     b: {
//         name: 'souvik',
//         age: 23
//     },
//     c: {
//         name: 'souvik',
//         age: 23
//     },
// }

// console.log(obj.length)