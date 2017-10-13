import React from 'react'
import { shallow, mount } from 'enzyme'

import { DatasetDownload } from '../DatasetDownload'

const featureType = {
  'type': 'wfs-featureType',
  'service': '556c6066330f1fcd48338831',
  'typeName': 'drac:bretagne_immeuble_mh',
  'available': true,
  '_id': '582e1ac513e286e23b67849a'
}

const filePackage = {
  'type': 'file-package',
  'name': 'Téléchargement simple du jeu et des documents associés',
  'location': 'http://atom.geo-ide.developpement-durable.gouv.fr/atomArchive/GetResource?id=6639ad65-fe9b-4c0e-b1c4-75a1ef8ef037&dataType=dataset',
  'hashedLocation': 'e2880991300be9f2f4aa9f8bbcd629ea94501a72',
  'available': true,
  'layer': 'dataset/N_AC1_GENERATEUR_SUP_S_032.TAB',
  '_id': '582bb403b631a32a2b33c376'
}

const { GEODATA_API_URL } = process.env
const previewMock = () => {}

const mocktranslate = k => k

describe('<DatasetDownload />', () => {
  describe('Available dataset', () => {
    describe('featureType', () => {
      it('should create a link to download wfs-featureType dataset type', () => {
        const link = `${GEODATA_API_URL}/services/556c6066330f1fcd48338831/feature-types/drac:bretagne_immeuble_mh/download?format=GeoJSON&projection=WGS84`
        const wrapper = mount(<DatasetDownload distribution={featureType} preview={previewMock} t={mocktranslate} />)

        expect(wrapper.find('a').get(0).getAttribute('href')).to.equal(link)
      })
    })

    describe('file-package', () => {
      it('should create a link to download file-package dataset type', () => {
        const link = `${GEODATA_API_URL}/file-packages/e2880991300be9f2f4aa9f8bbcd629ea94501a72/N_AC1_GENERATEUR_SUP_S_032.TAB/download?format=GeoJSON&projection=WGS84`
        const wrapper = mount(<DatasetDownload distribution={filePackage} preview={previewMock} t={mocktranslate} />)

        expect(wrapper.find('a').get(0).getAttribute('href')).to.equal(link)
      })
    })
  })

  describe('Unavailable dataset', () => {
    it('should display only dataset name', () => {
      const distribution = {
        ...featureType,
        available: false
      }

      const wrapper = shallow(<DatasetDownload distribution={distribution} preview={previewMock} t={mocktranslate} />)
      expect(wrapper).to.contain(<p>components.DatasetDownload.unavailable</p>)
    })
  })
})
