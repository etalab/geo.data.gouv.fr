import { formatData } from '../Histogram'

import data from './data.json'

const translateMock = k => k

describe('<Histogram />', () => {
  it('Should format data', () => {
    const formatedData = {
      labels: ['0', '1', '2', '3'],
      datasets: [
        {
          label: 'components.Histogram.label',
          lineTension: 0.2,
          backgroundColor: '#2185D0',
          data: [{ '05/10/2016': 665 }, { '06/10/2016': 665 }, { '07/10/2016': 831 }, { '08/10/2016': 832 }]
        }
      ]
    }

    expect(formatData(data, translateMock)).to.deep.equal(formatedData)
  })
})
