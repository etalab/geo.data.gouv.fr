import {generateDistributionInfo, generateDistributionId} from '../../lib/distribution'

describe('generateDistributionInfo', () => {
  it('should generate distribution link and layerName for a wfs distribution', () => {
    const distribution = {
      _id: '5ae9b6c7708c195caaf9cd79',
      type: 'wfs-featureType',
      service: '5a2e9c73f43c6a15cb04f897',
      typeName: 'hdf_draaf:l_part_sau_2015_cantons_s_r32',
      available: true
    }

    expect(generateDistributionInfo(distribution)).toMatchSnapshot()
  })

  it('should generate distribution link and layerName for a file-package distribution', () => {
    const distribution = {
      _id: '5ae7bcf390e0ad57ec364c48',
      type: 'file-package',
      name: 'hydrant',
      location: 'http://ids.e-aveyron.fr/media/easysdi/images/17910f42-0c5b-fee4-1503-69a707b72874_pei%20%2811%29.zip',
      hashedLocation: '8a704988cc8000c54c9b36761d681674c7ac4b24',
      available: true,
      layer: 'peiPoint.shp'
    }

    expect(generateDistributionInfo(distribution)).toMatchSnapshot()
  })

  it('should generate undefined properties if the distribution type is unknown', () => {
    const distribution = {
      type: 'something'
    }

    expect(generateDistributionInfo(distribution)).toMatchSnapshot()
  })

  it('should assign the typeName to layerName is defined', () => {
    const distribution = {
      type: 'something',
      typeName: 'foo'
    }

    expect(generateDistributionInfo(distribution)).toMatchSnapshot()
  })
})

describe('generateDistributionId', () => {
  it('should generate an identifier for file-package distributions', () => {
    const distribution = {
      _id: '5ae9b6c7708c195caaf9cd79',
      type: 'wfs-featureType',
      service: '5a2e9c73f43c6a15cb04f897',
      typeName: 'hdf_draaf:l_part_sau_2015_cantons_s_r32',
      available: true
    }

    expect(generateDistributionId(distribution)).toBe(
      'wfs:5a2e9c73f43c6a15cb04f897/hdf_draaf:l_part_sau_2015_cantons_s_r32'
    )
  })

  it('should generate an identifier for wfs distributions', () => {
    const distribution = {
      _id: '5ae7bcf390e0ad57ec364c48',
      type: 'file-package',
      name: 'hydrant',
      location: 'http://ids.e-aveyron.fr/media/easysdi/images/17910f42-0c5b-fee4-1503-69a707b72874_pei%20%2811%29.zip',
      hashedLocation: '8a704988cc8000c54c9b36761d681674c7ac4b24',
      available: true,
      layer: 'peiPoint.shp'
    }

    expect(generateDistributionId(distribution)).toBe(
      'file-package:8a704988cc8000c54c9b36761d681674c7ac4b24/peiPoint.shp'
    )
  })

  it('should not generate anything if the distribution type is unknown', () => {
    const distribution = {
      type: 'foo'
    }

    expect(generateDistributionId(distribution)).toBe(null)
  })
})
