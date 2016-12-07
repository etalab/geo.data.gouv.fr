import React from 'react'
import { shallow } from 'enzyme'
import DatasetSection from '../DatasetSection'
import MarkdownViewer from '../../Markdown/MarkdownViewer'
import datasetMock from '../../../fetch/__test__/dataset.json'
import { doneSince } from '../../../helpers/doneSince'
import { cloneDeep } from 'lodash'

describe('<DatasetSection />', () => {

  describe('When all metadata are defined', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<DatasetSection dataset={datasetMock} style={{}} />)
    })

    it('should display dataset title', () => {
      expect(wrapper.contains(datasetMock.metadata.title)).to.be.true
    })

    it('should display dataset description', () => {
      expect(wrapper.contains(<MarkdownViewer markdown={datasetMock.metadata.description} />)).to.be.true
    })

    it('should display dataset type', () => {
      expect(wrapper.contains(datasetMock.metadata.type)).to.be.true
    })

    it('should display dataset license', () => {
      expect(wrapper.contains(datasetMock.metadata.license)).to.be.true
    })

    it('should display dataset revision date', () => {
      expect(wrapper.contains(doneSince(datasetMock.revisionDate))).to.be.true
    })

    it('should display lineage', () => {
      expect(wrapper.contains(datasetMock.metadata.lineage)).to.be.true
    })

    it('should display dataset id', () => {
      expect(wrapper.contains(datasetMock.metadata.id)).to.be.true
    })
  })

  describe('When metadata are undefined', () => {
    let wrapper, modifiedDatasetMock
    beforeEach(() => {
      modifiedDatasetMock = cloneDeep(datasetMock)
      modifiedDatasetMock.metadata.license = undefined
      modifiedDatasetMock.metadata.type = undefined
      wrapper = shallow(<DatasetSection dataset={modifiedDatasetMock} style={{}} />)
    })

    it('should display dataset type', () => {
      expect(wrapper.contains('inconnu')).to.be.true
    })

    it('should display dataset license', () => {
      expect(wrapper.contains('non déterminé')).to.be.true
    })
  })


})
