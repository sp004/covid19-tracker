import React from 'react'
import { sortedData } from '../util'
import './Table.css'

const Table = ({countries}) => {
    
   const sortedCases = sortedData(countries)
  return (
      <div className="table">
        {/* <table>
            <tbody> */}
                {sortedCases.map((item, i) => (
                    <tr key={i}>
                        <td>{item.country}</td>
                        <td>{item.cases}</td>
                    </tr>
                ))}
            {/* </tbody>
        </table> */}
      </div>
  )
}

export default Table
