export const ACCEPTED_LICENSES = [
  'fr-lo',
  'odbl',
]

export function checkLicense(license) {
  if (!license) {
    return false
  } else if (ACCEPTED_LICENSES.includes(license)) {
    return true
  } else {
    return false
  }
}

export function checkProducers(organizations) {
  if (!!organizations && organizations.length > 0) return true
  return false
}

export function checkDataAvailability(distributions) {
  if (!!distributions && distributions.some((distribution) => distribution.available)) {
    return true
  }
  return false
}
