import { colors } from '../tools'

export const tagsColors = {
  processor: colors[0],
  resourceProvider: colors[0],
  publisher: colors[1],
  owner: colors[2],
  author: colors[3],
  custodian: colors[4],
  user: colors[5],
  distributor: colors[6],
  originator: colors[7],
  pointOfContact: colors[8],
  notDefined: colors[9],
  other: colors[9],
}

export const roleTradTable = {
  resourceProvider: 'Fournisseur',
  custodian: 'Responsable',
  owner: 'Propriétaire',
  user: 'Utilisateur',
  distributor: 'Distributeur',
  originator: 'Initiateur',
  pointOfContact: 'Point de contact',
  processor: 'Intervenant technique',
  publisher: 'Diffuseur',
  author: 'Auteur',
  notDefined: 'Inconnu',
  other: 'Autre'
}

export function translateRole(role) {
  return roleTradTable[role] || role
}
