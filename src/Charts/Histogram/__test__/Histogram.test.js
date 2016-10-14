import React from 'react'
import { shallow } from 'enzyme'
import { Line, Bar } from 'react-chartjs'
import Histogram from '../Histogram'

import data from './data.json'

describe('<Histogram />', () => {
  const height = 100
  const width = 100

  it('Should format data', () => {
    const wrapper = shallow(<Histogram chartType={Bar} data={data} height={height} width={width}/>)
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

  it('Should throw an error', (done) => {
    try {
      shallow(<Histogram data={data} height={height} width={width}/>)
    }
    catch(err) {
      expect(err).toEqual(new Error('chartType props must be Bar or Line'));
    }
    done();
  })

  it('Should render a Line component', () => {
    const wrapper = shallow(<Histogram chartType={Line} data={data} height={height} width={width}/>)
    const chart = <Line data={wrapper.instance().formatData(data)} height={height} width={width}/>

    expect(wrapper.contains(chart)).toEqual(true)
  })

  it('Should render a Bar component', () => {
    const wrapper = shallow(<Histogram chartType={Bar} data={data} height={height} width={width}/>)
    const chart = <Bar data={wrapper.instance().formatData(data)} height={height} width={width}/>

    expect(wrapper.contains(chart)).toEqual(true)
  })
})
