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
