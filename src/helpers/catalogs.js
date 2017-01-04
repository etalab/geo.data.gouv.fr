import moment from 'moment'
import { get } from 'lodash'

export function isNotSync(catalog) {
  if (catalog.service.sync.status === 'failed') return true
}

export function isNotEnough(catalog, param) {
  const total = get(catalog, 'metrics.datasets.totalCount')
  const percent = get(catalog, `metrics.datasets.partitions.${param}.yes`, 0) / total * 100
  if (percent && (percent > 20 && percent < 55)) return true
}

export function isAlmostNot(catalog, param) {
  const total = get(catalog, 'metrics.datasets.totalCount')
  const percent = get(catalog, `metrics.datasets.partitions.${param}.yes`, 0) / total * 100
  if (percent < 20) return true
}

export function isNotEnoughDownloadable(catalog) {
  return isNotEnough(catalog, 'download')
}

export function isAlmostNotDownloadable(catalog) {
  return isAlmostNot(catalog, 'download')
}

export function isNotEnoughOpen(catalog) {
  return isNotEnough(catalog, 'openness')
}

export function isAlmostNotOpen(catalog) {
  return isAlmostNot(catalog, 'openness')
}

export function isNoneType(catalog) {
  if (get(catalog, 'metric.datasets.partitions.dataType.none')) return true
  if (get(catalog, 'metrics.records.partitions.recordType.none')) return true
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
