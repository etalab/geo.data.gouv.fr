import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const parse = logs => {
  const result = {
    entries: [],
    totals: []
  }

  logs.forEach((log, idx) => {
    const [label, value] = log.split(':')

    if (label.startsWith('  *')) {
      result.totals.push({
        key: idx,
        label,
        value
      })
    } else {
      result.entries.push({
        key: idx,
        label,
        value
      })
    }
  })

  return result
}

const Logs = ({ logs, t }) => {
  const { entries, totals } = parse(logs)

  return (
    <div>
      <ul>
        {entries.map(({ key, label, value }) => (
          <li key={key}>
            {t(`harvest.logs.labels.${label}`, {
              defaultValue: label
            })} <b>{value}</b>
          </li>
        ))}
      </ul>

      {totals.length > 0 && (
        <ul className='totals'>
          {totals.map(({ key, label, value }) => (
            <li key={key}>
              {t(`harvest.logs.labels.${label}`, {
                defaultValue: label
              })} <b>{value}</b>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        @import 'colors';

        ul {
          padding: 0;
          list-style-position: inside;
        }

        li {
          word-break: break-all;
        }

        .totals {
          padding-top: 1em;
          margin-top: 1em;
          border-top: 1px solid $lightgrey;
        }
      `}</style>
    </div>
  )
}

Logs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Logs)
