import React from 'react'
import { shallow } from 'enzyme'
import { Line } from 'react-chartjs'
import LineChart from '../LineChart'

import data from './data.json'

describe('<LineChart />', () => {
  const height = 100
  const width = 100
  const wrapper = shallow(<LineChart data={data} height={height} width={width}/>)

  it('Should format data', () => {
    const formatedData = {
      labels: ["0", "1", "2", "3"],
      datasets: [
        {
          fillColor: "#2185D0",
          data: [{"05/10/2016": 665}, {"06/10/2016": 665}, {"07/10/2016": 831}, {"08/10/2016": 832}]
        }
      ]
    }
    expect(wrapper.instance().formatData(data)).toEqual(formatedData)
  })

  it('Should render a Line component', () => {
    const chart = <Line data={wrapper.instance().formatData(data)} height={height} width={width}/>
    expect(wrapper.contains(chart)).toEqual(true)
  })
})
