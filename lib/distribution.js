import getConfig from 'next/config'
import strRightBack from 'underscore.string/strRightBack'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

// eslint-disable-next-line import/prefer-default-export
export function generateDistributionInfo(distribution) {
  let link
  let layerName

  switch (distribution.type) {
    case 'file-package':
      layerName = strRightBack(distribution.layer, '/')
      link = `${GEODATA_API_URL}/file-packages/${distribution.hashedLocation}/${layerName}/download`
      break

    case 'wfs-featureType':
      link = `${GEODATA_API_URL}/services/${distribution.service}/feature-types/${distribution.typeName}/download`
      break

    default:
      break
  }

  return {
    link,
    layerName: layerName || distribution.typeName
  }
}

