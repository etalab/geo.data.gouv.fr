import React from 'react'
import { shallow } from 'enzyme'
import DatasetsHealth from '../DatasetsHealth'

describe('<DatasetsHealth />', () => {
  describe('openness', () => {
    describe('When percentage of open data is too low', () => {
      it('should display a error message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { openness: { yes: 10 } } } } }
        const msg = 'Le pourcentage de données ouvertes est trop faible'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })

    describe('When percentage of open data is low', () => {
      it('should display a warning message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { openness: { yes: 42 } } } } }
        const msg = 'Le pourcentage de données ouvertes est faible'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })

    describe('When percentage of open data is correct', () => {
      it('should display a success message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { openness: { yes: 70 } } } } }
        const msg = 'Le pourcentage de données ouvertes est bon'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })
  })

  describe('downloadable', () => {
    describe('When percentage of downloadable data is too low', () => {
      it('should display a error message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { download: { yes: 10 } } } } }
        const msg = 'Le pourcentage de données téléchargeable est trop faible'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })

    describe('When percentage of downloadable data is low', () => {
      it('should display a warning message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { download: { yes: 42 } } } } }
        const msg = 'Le pourcentage de données téléchargeable est faible'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })

    describe('When percentage of downloadable data is correct', () => {
      it('should display a success message', () => {
        const catalog = { metrics: { datasets: { totalCount: 100, partitions: { download: { yes: 70 } } } } }
        const msg = 'Le pourcentage de données téléchargeable est bon'
        const wrapper = shallow(<DatasetsHealth catalog={catalog}/>)

        expect(wrapper.text()).to.contain(msg)
      })
    })
  })
})
