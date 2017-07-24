import moment from 'moment'

export function doneSince(endTime, language = 'en') {
  const endDate = new Date(endTime).getTime()
  if (!isNaN(endDate)) {
    moment.locale(language)
    const since = moment(endDate).fromNow()
    if (since !== 'Invalid Date') return since
  }
  return 'N/A'
}
