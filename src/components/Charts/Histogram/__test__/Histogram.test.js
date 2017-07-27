import React from 'react'
import { shallow } from 'enzyme'
import { Line } from 'react-chartjs-2'
import { Histogram, formatData } from '../Histogram'

import data from './data.json'

const t = k => k

describe('<Histogram />', () => {
  const height = 100
  const width = 100
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }

  it('Should format data', () => {
    const formatedData = {
      labels: ['0', '1', '2', '3'],
      datasets: [
        {
          label: 'label',
          lineTension: 0.2,
          backgroundColor: '#2185D0',
          data: [{'05/10/2016': 665}, {'06/10/2016': 665}, {'07/10/2016': 831}, {'08/10/2016': 832}]
        }
      ]
    }

    expect(formatData(data, t)).to.deep.equal(formatedData)
  })

  it('Should throw an error', (done) => {
    try {
      shallow(<Histogram data={data} height={height} width={width} t={t} />)
    }
    catch(err) {
      expect(err).to.deep.equal(new Error('chartType props must be Bar or Line'));
    }
    done();
  })

  it('Should render a Line component', () => {
    const wrapper = shallow(<Histogram data={data} height={height} width={width} t={t} />)

    expect(wrapper).to.contain(<Line data={formatData(data, t)} height={height} width={width} options={options}/>)
  })
})
