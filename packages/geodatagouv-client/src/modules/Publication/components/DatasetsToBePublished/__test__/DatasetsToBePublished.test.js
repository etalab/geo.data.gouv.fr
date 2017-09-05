import React from 'react'
import PropTypes from 'prop-types'
import createRouterContext from 'react-router-test-context'
import { shallow, mount } from 'enzyme'

const DatasetsToBePublished = require('proxyquire')('../DatasetsToBePublished', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

const datasets = [
  { _id: 1, title: 'dataset1' },
  { _id: 2, title: 'dataset2' },
  { _id: 3, title: 'dataset3' }
]

describe('<DatasetsToBePublished />', () => {
  describe('Publication in progress', () => {
    it('should display only one dataset in progress', () => {
      const dataset1 = datasets[0]
      const dataset2 = datasets[1]

      const wrapper = mount(
        <DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />, {
          context: createRouterContext(),
          childContextTypes: {
            router: PropTypes.object
          }
        }
      )

      wrapper.instance().addDatasetToPublish(dataset1)
      wrapper.instance().publishDatasets()
      wrapper.instance().addDatasetToPublish(dataset2)

      expect(wrapper.state().publicationsInProgress.includes(dataset1)).to.be.true
      expect(wrapper.state().publicationsInProgress.includes(dataset2)).to.be.false

      expect(wrapper.html()).to.contain('<div><a href="/datasets/1">dataset1</a><div>Publication en cours...</div></div>')
      expect(wrapper.html()).to.contain('<div><a href="/datasets/2">dataset2</a><input type="checkbox"></div>')
    })
  })

  describe('When datasets is empty', () => {
    it('should render a message', () => {
      const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={[]} title={''} status={''} />)

      expect(wrapper.text()).to.contain('Aucun jeu de données.')
    })
  })

  describe('toPublish state', () => {
    it('should be init with empty array', () => {
      const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

      expect(wrapper.state('toPublish')).to.eql([])
    })
  })

  describe('Publishing button', () => {
    describe('When toPublish state contain all datasets', () => {
      it('should display "Publier toutes les données" text', () => {
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().setState({ toPublish: datasets })

        expect(wrapper.text()).to.contain('Tout désélectionner')
        expect(wrapper.text()).to.contain('Publier toutes les données')
      })
    })

    describe('When toPublish state contain at least one datasets', () => {
      it('should display "Publier les données séléctionnées" text', () => {
        const dataset = datasets[0]
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.text()).to.contain('Tout sélectionner')
        expect(wrapper.text()).to.contain('Publier les données sélectionnées')
      })
    })

    describe('When toPublish state contain any dataset', () => {
      it('should be disable', () => {
        const dataset = { _id: 1, title: 'dataset1' }
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={[dataset]} title={''} status={''} />)

        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.text()).to.contain('Tout sélectionner')
        expect(wrapper.text()).to.contain('Publier les données sélectionnées')
      })
    })
  })

  describe('addDatasetToPublish()', () => {
    describe('when dataset is not in toPublish', () => {
      it('should be add to toPublish array', () => {
        const dataset = { _id: 4, title: 'dataset4' }
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().addDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.contain(dataset)
      })
    })

    describe('when dataset is already in toPublish', () => {
      it('should not be add to toPublish array', () => {
        const dataset = datasets[0]
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().addDatasetToPublish(dataset)
        wrapper.instance().addDatasetToPublish(dataset)

        expect(wrapper.state('toPublish').length).to.equal(1)
      })
    })
  })

  describe('removeDatasetToPublish()', () => {
    describe('when dataset is in toPublish', () => {
      it('should remove from toPublish array', () => {
        const dataset = { _id: 1, title: 'dataset1' }
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().setState({ toPublish: datasets })
        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.eql([
          { _id: 2, title: 'dataset2' },
          { _id: 3, title: 'dataset3' }
        ])
      })
    })

    describe('when dataset is not in toPublish', () => {
      it('should do nothing', () => {
        const dataset = { _id: 4, title: 'dataset4' }
        const wrapper = shallow(<DatasetsToBePublished organizationId='1' datasets={datasets} title={''} status={''} />)

        wrapper.instance().setState({ toPublish: datasets })
        wrapper.instance().removeDatasetToPublish(dataset)

        expect(wrapper.state('toPublish')).to.eql(datasets)
      })
    })
  })
})
