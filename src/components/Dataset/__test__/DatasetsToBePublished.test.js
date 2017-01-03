import React from 'react'
import { shallow } from 'enzyme'
import DatasetsToBePublished from '../DatasetsToBePublished'

const datasets = [
  {_id: 1, title: 'dataset1'},
  {_id: 2, title: 'dataset2'},
  {_id: 3, title: 'dataset3'},
]

describe('<DatasetsToBePublished />', () => {

  describe('When datasets is empty', () => {
    it('should render a message', () => {
      const wrapper = shallow(<DatasetsToBePublished datasets={[]} title={''} status={''} />)

      expect(wrapper.text()).to.contain('Aucun jeu de données.')
    })
  })

  describe('toPublish state', () => {
    it('should be init with all datasets', () => {
      const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

      expect(wrapper.state('toPublish')).to.eql(datasets)
    })
  })

  describe('Publishing button', () => {
    describe('When toPublish state contain all datasets', () => {
      it('should display "Publier toutes les données" text', () => {
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        expect(wrapper.text()).to.contain('Tout décocher')
        expect(wrapper.text()).to.contain('Publier toutes les données')
      })
    })

    describe('When toPublish state contain at least one datasets', () => {
      it('should display "Publier les données séléctionnées" text', () => {
        const dataset = datasets[0]
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.text()).to.contain('Tout cocher')
        expect(wrapper.text()).to.contain('Publier les données séléctionnées')
      })
    })

    describe('When toPublish state contain any dataset', () => {
      it('should be disable', () => {
        const dataset = {_id: 1, title: 'dataset1'}
        const wrapper = shallow(<DatasetsToBePublished datasets={[dataset]} title={''} status={''} />)

        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.text()).to.contain('Tout cocher')
        expect(wrapper.text()).to.contain('Publier les données séléctionnées')
      })
    })
  })

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
        const dataset = datasets[0]
        const wrapper = shallow(<DatasetsToBePublished datasets={datasets} title={''} status={''} />)

        wrapper.instance().addDatasetToPublish(dataset)

        expect(wrapper.state('toPublish').length).to.equal(3)
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

        expect(wrapper.state('toPublish')).to.eql(datasets)
      })
    })
  })

})
