import moment from 'moment'
import { get } from 'lodash'

export const isObsolete = catalog => {
  const revisionDate = get(catalog, 'metrics.mostRecentRevisionDate')

  return revisionDate && moment().subtract(6, 'months').isAfter(revisionDate)
}
