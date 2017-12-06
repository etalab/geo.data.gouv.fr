import moment from 'moment'
import { get, filter, sortBy } from 'lodash'

export const isObsolete = catalog => {
  const revisionDate = get(catalog, 'metrics.mostRecentRevisionDate')

  return revisionDate && moment().subtract(6, 'months').isAfter(revisionDate)
}

export const findCandidates = (catalogs, blacklist = []) => filter(
  catalogs,
  catalog =>
    !blacklist.includes(catalog.id) &&
    get(catalog, 'metrics.datasets.partitions.openness.yes', 0) >= 1 &&
    get(catalog, 'metrics.datasets.partitions.download.yes', 0) >= 1
)

export const computeScore = catalog => {
  const total = get(catalog.metrics, 'datasets.totalCount', 0)

  if (!total) {
    return 0
  }

  const percentOpen = get(catalog.metrics, 'datasets.partitions.openness.yes', 0) / total * 100
  const percentDownloadable = get(catalog.metrics, 'datasets.partitions.download.yes', 0) / total * 100

  const now = new Date()
  const sixMonthsAgo = moment(now).subtract(6, 'months')
  const oneMonthAgo = moment(now).subtract(1, 'months')

  // Compute freshness
  let freshness = 1
  if (catalog.metrics.mostRecentRevisionDate) {
    if (oneMonthAgo.isBefore(catalog.metrics.mostRecentRevisionDate)) {
      freshness = 100
    } else if (sixMonthsAgo.isBefore(catalog.metrics.mostRecentRevisionDate)) {
      freshness = 10
    }
  }

  // Compute downloadability
  const downloadability = Math.pow(Math.max(Math.min(percentDownloadable, 100), 1), 2)

  // Compute openness
  const openness = Math.max(Math.min(percentOpen, 100), 1)

  return freshness * downloadability * openness
}

export const sortByScore = catalogs => sortBy(catalogs, catalog => -computeScore(catalog))
