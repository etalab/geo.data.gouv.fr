import moment from 'moment'
import { sortBy, filter, get } from 'lodash'

export function getCandidateCatalogs(catalogs, sourceCatalogs) {
  return filter(catalogs, catalog =>
    !sourceCatalogs.includes(catalog.id) &&
    get(catalog, 'metrics.datasets.partitions.openness.yes', 0) >= 1 &&
    get(catalog, 'metrics.datasets.partitions.download.yes', 0) >= 1)
}

export function getCatalogOrderByScore(catalogs) {
  return sortBy(catalogs, catalog => -computeCatalogScore(catalog))
}

export function isObsolete(catalog, currentDate = new Date()) {
  const mostRecentRevisionDate = get(catalog, 'metrics.mostRecentRevisionDate')
  if (!mostRecentRevisionDate) return
  return (moment(currentDate).subtract(6, 'months').isAfter(mostRecentRevisionDate))
}

export function computeFreshnessScore(mostRecentRevisionDate, currentDate = new Date()) {
  if (!mostRecentRevisionDate) return 1
  if (moment(currentDate).subtract(1, 'months').isBefore(mostRecentRevisionDate)) return 100
  if (moment(currentDate).subtract(6, 'months').isBefore(mostRecentRevisionDate)) return 10
  return 1
}

export function computeDownloadableScore(percentDownloadable) {
  const v = Math.max(Math.min(percentDownloadable, 100), 1)
  return v * v
}

export function computeOpenScore(percentOpen) {
  return Math.max(Math.min(percentOpen, 100), 1)
}

export function computeCatalogScore(catalog, currentDate) {
  const total = get(catalog.metrics, 'datasets.totalCount', 0)
  if (total === 0) return 0

  const percentOpen = get(catalog.metrics, 'datasets.partitions.openness.yes', 0) / total * 100
  const percentDownloadable = get(catalog.metrics, 'datasets.partitions.download.yes', 0) / total * 100

  return computeFreshnessScore(catalog.metrics.mostRecentRevisionDate, currentDate) *
    computeDownloadableScore(percentDownloadable) *
    computeOpenScore(percentOpen)
}
