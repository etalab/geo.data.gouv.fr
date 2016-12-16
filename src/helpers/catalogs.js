import moment from 'moment'
import { get } from 'lodash'

export function isObsolete(catalog, refDate = new Date()) {
  const mostRecentRevisionDate = get(catalog, 'metrics.mostRecentRevisionDate')
  if (!mostRecentRevisionDate) return
  return (moment(refDate).subtract(6, 'months').isAfter(mostRecentRevisionDate))
}

export function computeFreshnessScore(mostRecentRevisionDate, refDate = new Date()) {
  if (!mostRecentRevisionDate) return 1
  if (moment(refDate).subtract(1, 'months').isBefore(mostRecentRevisionDate)) return 100
  if (moment(refDate).subtract(6, 'months').isBefore(mostRecentRevisionDate)) return 10
  return 1
}

export function computeDownloadableScore(percentDownloadable) {
  const v = Math.max(Math.min(percentDownloadable, 100), 1)
  return v * v
}

export function computeOpenScore(percentOpen) {
  return Math.max(Math.min(percentOpen, 100), 1)
}

export function computeCatalogScore(catalog, refDate) {
  const total = get(catalog.metrics, 'datasets.totalCount', 0)
  if (total === 0) return 0

  const percentOpen = get(catalog.metrics, 'datasets.partitions.openness.yes', 0) / total * 100
  const percentDownloadable = get(catalog.metrics, 'datasets.partitions.download.yes', 0) / total * 100

  return computeFreshnessScore(catalog.metrics.mostRecentRevisionDate, refDate) *
    computeDownloadableScore(percentDownloadable) *
    computeOpenScore(percentOpen)
}
