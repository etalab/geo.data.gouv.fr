import React, { Component } from 'react'
import { Pie } from 'react-chartjs'

class Partitions extends Component {
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
    const colors = [
      {name: 'blue', value: '#2185D0'},
      {name: 'teal', value: '#00B5AD'},
      {name: 'green', value: '#21BA45'},
      {name: 'yellow', value: '#FBBD08'},
      {name: 'purple', value: '#A333C8'},
      {name: 'orange', value: '#F2711C'},
      {name: 'red', value: '#DB2828'}
    ]

    return colors[idx] ? colors[idx] : {name: 'grey', value: '#767676'}
  }

  render() {
    const data = this.getData()

    return (
      <div className="ui grid container">

        <div className="two column row">
          <div className="column">
            <Pie data={data} />
          </div>

          <div className="column">
            <div className="ui list">
              {data.map((item, idx) =>
                <div key={idx} className="item">
                  <div className="right floated content">
                    <div className={`ui small ${item.colorName} label`}>{item.label}</div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default Partitions
