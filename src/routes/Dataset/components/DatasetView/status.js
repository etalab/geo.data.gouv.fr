export const statusTranslate = {
  completed: {
    status: 'terminée'
  },
  historicalArchive: {
    status: 'archivée'
  },
  obsolete: {
    status: 'obsolète',
    consequences: 'Les données peuvent être incomplètes ou ne plus être à jour'
  },
  onGoing: {
    status: 'en cours'
  },
  planned: {
    status: 'planifiée'
  },
  required: {
    status: 'mise à jour requise'
  },
  underDevelopment: {
    status: 'en construction',
    consequences: 'Certaines données peuvent être erronées ou vont subir des changements'
  },
}

export function isWarningStatus(status) {
  if (status) {
    if (statusTranslate[status] && statusTranslate[status].consequences) {
      return true
    }
  }
  return false
}
