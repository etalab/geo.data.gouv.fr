export const ACCEPTED_LICENSES = {
  'odbl': {
    name: 'Open Database License',
    logo: null,
    url: 'https://vvlibri.org/fr/licence/odbl/10/fr',
    description: 'L\'Open Database License (ODbL) est un contrat licence de base de données favorisant la libre circulation des données. Elle est issue du projet opendatacommons.org de l\'Open Knowledge Foundation. Sa traduction en français est le fruit d\'une collaboration entre l\'association VeniVidiLibri et la Mairie de Paris dans le cadre du projet ParisData.',
    rules: {
      permissions: [
        'Copier, distribuer et utiliser la base de données',
        'Produire des créations à partir de cette base de données.',
        'Modifier, transformer et construire à partir de cette base de données.',
      ],
      conditions: [
        'Mentionner la paternité',
        'Partager aux conditions identiques',
        'Garder ouvert'
      ],
      limitations: [
      ],
    },
  },
  'fr-lo': {
    name: 'Licence Ouverte',
    logo: '/assets/Logo-licence-ouverte2.svg.png',
    url: 'https://www.etalab.gouv.fr/licence-ouverte-une-nouvelle-mouture-pour-anticiper-le-cadre-legal-a-venir',
    description: 'La licence ouverte / open licence est une licence libre française créée par la mission Etalab afin d\'encadrer l\'ouverture des données de l’État français. Cette licence, présentée le 18 octobre 20112, a été voulue comme une licence compatible avec les licences Open Government Licence (OGL) du Royaume-Uni, Open Data Commons Attribution (ODC-BY) de l\'Open Knowledge Foundation et Creative Commons Attribution 2.0 (CC-BY 2.0) de Creative Commons.',
    rules: {
      permissions: [
      ],
      conditions: [
      ],
      limitations: [
      ],
    },
  }
}

export function checkLicense(license) {
  if (!license || !ACCEPTED_LICENSES[license]) return false
  return true
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
