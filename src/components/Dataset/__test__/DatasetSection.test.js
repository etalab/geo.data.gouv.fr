import React from 'react'
import { shallow } from 'enzyme'
import DatasetSection from '../DatasetSection'
import datasetMock from '../../../fetch/__test__/dataset.json'
import { doneSince } from '../../../helpers/doneSince'
import { cloneDeep } from 'lodash'

describe('<DatasetSection />', () => {

  describe('When all metadata are defined', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<DatasetSection dataset={datasetMock} />)
    })

    it('should display dataset title', () => {
      expect(wrapper.contains(datasetMock.metadata.title)).toBe(true)
    })

    it('should display dataset description', () => {
      expect(wrapper.contains(datasetMock.metadata.description)).toBe(true)
    })

    it('should display dataset type', () => {
      expect(wrapper.contains(datasetMock.metadata.type)).toBe(true)
    })

    it('should display dataset license', () => {
      expect(wrapper.contains(datasetMock.metadata.license)).toBe(true)
    })

    it('should display dataset revision date', () => {
      expect(wrapper.contains(doneSince(datasetMock.revisionDate))).toBe(true)
    })

    it('should display lineage', () => {
      expect(wrapper.contains(datasetMock.metadata.lineage)).toBe(true)
    })

    it('should display dataset id', () => {
      expect(wrapper.contains(datasetMock.metadata.id)).toBe(true)
    })
  })

  describe('When metadata are undefined', () => {
    let wrapper, modifiedDatasetMock
    beforeEach(() => {
      modifiedDatasetMock = cloneDeep(datasetMock)
      modifiedDatasetMock.metadata.license = undefined
      modifiedDatasetMock.metadata.type = undefined
      wrapper = shallow(<DatasetSection dataset={modifiedDatasetMock} />)
    })

    it('should display dataset type', () => {
      expect(wrapper.contains('unknown')).toBe(true)
    })

    it('should display dataset license', () => {
      expect(wrapper.contains('not determined')).toBe(true)
    })
  })


})
