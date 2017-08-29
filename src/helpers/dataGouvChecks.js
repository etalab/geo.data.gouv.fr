export const ACCEPTED_LICENSES = {
  'fr-lo': { name: 'Licence Ouverte', link: 'https://www.etalab.gouv.fr/licence-ouverte-open-licence' },
  'fr-loa': { name: 'Licence Ouverte Administrations', link: 'https://www.etalab.gouv.fr/nouvelle-licence-pour-la-reutilisation-des-informations-publiques-elements-de-clarification' },
  'odbl': { name: 'Open Database License (ODbL 1.0)', link: 'https://vvlibri.org/fr/licence/odbl/10/fr' }
}

export function checkLicense(license) {
  if (!license || !ACCEPTED_LICENSES[license]) return false
  return true
}

export function getLicense(license) {
  if (!license) return 'non déterminée'
  if (!checkLicense(license)) return 'inconnue'
  return ACCEPTED_LICENSES[license]
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
