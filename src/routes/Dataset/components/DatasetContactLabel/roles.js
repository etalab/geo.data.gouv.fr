const roleTradTable = {
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
