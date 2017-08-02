export function getRelated(producers, organizationId) {
  return producers.filter(producer => producer.associatedTo && producer.associatedTo === organizationId)
}

export function getUnrelated(producers) {
  return producers.filter(producer => !producer.associatedTo)
}

export function getRelatedToOther(producers, organizationId) {
  return producers.filter(producer => producer.associatedTo && producer.associatedTo !== organizationId)
}
