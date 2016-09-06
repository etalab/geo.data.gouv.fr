import React, { Component } from 'react'
import { Pie } from 'react-chartjs'

class Partitions extends Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }

  getData() {
    const data = this.props.data
    return Object.keys(data).map( val => { return {
      'label': val,
      'value': data[val],
    } })
  }

  render() {
    const data = this.getData()

    return (
        <div className="ui container">
          <Pie data={data.sort((a, b) => {
            return a.value < b.value
          })} />
        </div>
      )
  }
}

export default Partitions
