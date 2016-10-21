import React from 'react'
import { mountWithContext } from '../../config/jsdom-setup'
import DatasetDetail from './DatasetDetail'
import CircularProgress from 'material-ui/CircularProgress'
import datasetMock from '../../fetch/__test__/dataset.json'

jest.mock('../../fetch/fetch')

describe('<DatasetDetail />', () => {

  describe('Loading dataset', () => {
    it('should display a <CircularProgress />', () => {
      const wrapper = mountWithContext(<DatasetDetail params={{ datasetId: '1' }} />)
      const progress = <CircularProgress size={2} />
      expect(wrapper.contains(progress)).toBe(true)
    })
  })

  describe('Loaded dataset', () => {
    it('should display dataset title', () => {
      const wrapper = mountWithContext(<DatasetDetail params={{ datasetId: '1' }} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          const titleBlock = <h1>{datasetMock.metadata.title}</h1>
          expect(wrapper.contains(titleBlock)).toBe(true)
        })
    })
  })

})
