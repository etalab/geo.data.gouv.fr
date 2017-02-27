import React from 'react'
import { shallow } from 'enzyme'

import DatasetChecklist from '../DatasetChecklist'

const dataset = {
  metadata: {license: 'fr-lo'},
  organizations: ['producteur'],
  dataset: { distributions: [{available: true}] },
}

describe('<DatasetChecklist />', () => {
  describe('All tests are validated', () => {
    describe('Is published on data.gouv.fr', () => {
      it('should display a link to data.gouv.fr', () => {
        dataset.metadata.datagouvLink = 'data.gouv.fr/dataset/42'
        const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

        expect(wrapper.html()).to.contain(dataset.metadata.datagouvLink)
      })
    })

    describe('Not published on data.gouv.fr', () => {
      it('should display a message', () => {
        dataset.metadata.datagouvLink = null
        const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

        expect(wrapper.html()).to.contain('Ce jeu de données peut être publié sur data.gouv.fr')
      })
    })
  })

  describe('At least one test failed', () => {
    it('should display details', () => {
      dataset.organizations = []
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      expect(wrapper.html()).to.contain('Ce jeu de données ne peut pas être publié sur data.gouv.fr')
    })
  })
})
