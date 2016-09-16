import React from 'react'
import Harvest from './Harvest/Harvest'

const HarvestsSection = ({catalog}) => {
  let harvests = []

  harvests.push(catalog.lastHarvesting)
  return (
    <table className="ui celled striped selectable table">
      <thead>
        <tr>
        <th>Status</th>
        <th>Records found</th>
        <th>Finish</th>
        <th>Duration</th>
      </tr></thead>
      <tbody>
      {harvests.map((harvest, idx) => (
          <Harvest key={idx} harvest={harvest}/>
      ))}

        <tr>
          <td className="collapsing"><div className="ui green circular label">successful</div></td>
          <td>5143</td>
          <td className="right aligned collapsing">15 hours ago</td>
          <td className="right aligned collapsing">1 hour 42 min</td>
        </tr>

        <tr>
          <td className="collapsing"><div className="ui red circular label">failed</div></td>
          <td>5143</td>
          <td className="right aligned collapsing">24 hours ago</td>
          <td className="right aligned collapsing">57 min</td>
        </tr>

        <tr>
          <td className="collapsing"><div className="ui green circular label">successful</div></td>
          <td>5143</td>
          <td className="right aligned collapsing">48 hours ago</td>
          <td className="right aligned collapsing">1 hour</td>
        </tr>

      </tbody>
    </table>
  )
}

export default HarvestsSection
