import {truncate} from 'lodash'

export default function prune(str, limit) {
  return truncate(str, {
    length: limit,
    omission: '…',
    separator: /[ \t\n,:;«»"“”]+/
  })
}
