import moment from 'moment'

export function doneSince(endTime) {
  const endDate = new Date(endTime).getTime()
  if (!isNaN(endDate)) {
    const since = moment(endDate).fromNow()
    if (since !== 'Invalid Date') return since
  }
  return 'N/A'
}
