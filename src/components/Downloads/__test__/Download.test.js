import React from 'react'
import { shallow } from 'enzyme'
import Download from '../Download'

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

const format = {label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS42'}

describe('<Download />', () => {

  describe('Available dataset', () => {

  describe('featureType', () => {
    it('should create a link to download wfs-featureType dataset type', () => {
      const link = <a href='https://inspire.data.gouv.fr/api/geogw/services/556c6066330f1fcd48338831/feature-types/drac:bretagne_immeuble_mh/download?format=GeoJSON&amp;projection=WGS42'>drac:bretagne_immeuble_mh</a>
      const wrapper = shallow(<Download distribution={featureType} dlFormat={format}/>)
      expect(wrapper).to.contain(link)
    })
  })

    describe('file-package', () => {
      it('should create a link to download file-package dataset type', () => {
        const link = <a href='https://inspire.data.gouv.fr/api/geogw/file-packages/e2880991300be9f2f4aa9f8bbcd629ea94501a72/N_AC1_GENERATEUR_SUP_S_032.TAB/download?format=GeoJSON&amp;projection=WGS42'>N_AC1_GENERATEUR_SUP_S_032.TAB</a>
        const wrapper = shallow(<Download distribution={filePackage} dlFormat={format}/>)
        expect(wrapper).to.contain(link)
      })
    })
  })


  describe('Unavailable dataset', () => {
    it('should display only dataset name', () => {
      let dataset = featureType
      dataset.available = false
      const div = <div style={{}}>drac:bretagne_immeuble_mh</div>
      const wrapper = shallow(<Download distribution={featureType} dlFormat={format} style={{}}/>)
      expect(wrapper).to.contain(div)
    })
  })

})
