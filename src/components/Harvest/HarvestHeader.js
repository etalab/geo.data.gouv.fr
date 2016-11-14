import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { theme } from '../../tools'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse',
  },
  h1: {
    padding: '0.1em',
  },
  chip: {
    margin: '2em',
  },
}

const HarvestHeader = ({ catalogId, catalogName, harvest, successful }) => {
  const date = new Date(harvest.finished).getTime()
  const hoursDifference = moment(date).fromNow()

  styles.chip.color = successful ? theme.green : theme.red

  return (
    <div style={styles.header} >
      <div>
        <Link to={`/catalogs/${catalogId}`}>
          <h1 style={styles.h1} className="ui header">{catalogName}</h1>
        </Link>
        <h2>Harvest ID: {harvest._id}</h2>
      </div>

      <span style={styles.chip}>
        {harvest.status} {hoursDifference}
      </span>
    </div>
  )
}

export default HarvestHeader
