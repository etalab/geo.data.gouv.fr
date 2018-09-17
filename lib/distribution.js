import getConfig from 'next/config'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

export function isDistributable(resources) {
  for (const resource of resources) {
    switch (resource.type) {
      case 'download':
        if (resource.downloads.some(d => d.resourceType !== 'other')) {
          return true
        }
        continue

      case 'service':
        if (resource.serviceType === 'wfs' && resource.features.some(f => f.available)) {
          return true
        }
        continue

      default:
        continue
    }
  }

  return false
}

export function generateDistributionInfo(distribution) {
  let link
  let layerName

  switch (distribution.type) {
    case 'file-package': {
      const idx = distribution.layer.lastIndexOf('/')

      layerName = idx === -1 ?
        distribution.layer :
        distribution.layer.substring(idx + 1, distribution.layer.length)

      link = `${GEODATA_API_URL}/download/${distribution.linkId}/${distribution.path}`
      // link = `${GEODATA_API_URL}/download/${encodeURIComponent(distribution.location)}`
      break
    }

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

export function generateDistributionId(distribution) {
  switch (distribution.type) {
    case 'file-package':
      return `file-package:${distribution.hashedLocation}/${distribution.layer}`

    case 'wfs-featureType':
      return `wfs:${distribution.service}/${distribution.typeName}`

    default:
      return null
  }
}
