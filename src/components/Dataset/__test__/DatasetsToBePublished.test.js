import React from 'react'
import { shallow } from 'enzyme'
import DatasetsToBePublished from '../DatasetsToBePublished'

const datasets = [
  {_id: 1, title: 'dataset1'},
  {_id: 2, title: 'dataset2'},
  {_id: 3, title: 'dataset3'},
]

describe('<DatasetsToBePublished />', () => {

  describe('addDatasetToPublish()', () => {
    describe('when dataset is not in toPublish', () => {
      it('should be add to toPublish array', () => {
        const dataset = {_id: 4, title: 'dataset4'}
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().addDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.contain(dataset)
      })
    })

    describe('when dataset is already in toPublish', () => {
      it('should not be add to toPublish array', () => {
        const dataset = {_id: 1, title: 'dataset1'}
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().addDatasetToPublish(dataset)
        wrapper.instance().addDatasetToPublish(dataset)

        expect(wrapper.state('toPublish').length).to.equal(1)
      })
    })
  })

  describe('removeDatasetToPublish()', () => {
    describe('when dataset is in toPublish', () => {
      it('should remove from toPublish array', () => {
        const dataset = {_id: 1, title: 'dataset1'}
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().setState({toPublish: datasets})
        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.eql([
          {_id: 2, title: 'dataset2'},
          {_id: 3, title: 'dataset3'},
        ])
      })
    })

    describe('when dataset is not in toPublish', () => {
      it('should do nothing', () => {
        const dataset = {_id: 4, title: 'dataset4'}
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().setState({toPublish: datasets})
        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.equal(datasets)
      })
    })
  })

})
