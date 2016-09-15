import React, { Component } from 'react'
import { Pie } from 'react-chartjs'
import { colors } from '../../tools.js'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }

  getData() {
    const data = this.props.data

    return Object.keys(data).map( (val, idx) => {
      const color = this.setColor(idx)

      return {
        'label': val,
        'value': data[val],
        'color':  color.value,
        'colorName': color.name
      } })
      .sort((a, b) => {
        return a.value < b.value
      })
  }

  setColor(idx) {
    return colors[idx] ? colors[idx] : {name: 'grey', value: '#767676'}
  }

  render() {
    const data = this.getData()

    return (
      <div className="ui two column stackable grid container">

          <div className="center aligned column">
            <Pie data={data} width="200" />
          </div>

          <div className="computer only tablet only left aligned column">
            <div className="ui list">
              {data.map((item, idx) =>
                <div key={idx} className="item">
                  <div className="content">
                    <div className={`ui small ${item.colorName} label`}>{item.label}</div>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="mobile only column">
            <div className="ui list">
              {data.map((item, idx) =>
                <div key={idx} className="item">
                  <div className="content">
                    <div className={`ui small ${item.colorName} label`}>{item.label}</div>
                  </div>
                </div>)}
            </div>
          </div>

      </div>
      )
  }
}

export default PieChart
