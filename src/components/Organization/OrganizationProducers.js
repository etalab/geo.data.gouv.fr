import React from 'react'
import Counter from '../Statistics/Counter/Counter'
import { theme } from '../../tools'

const styles = {
  counters: {
    display: 'flex',
    flexDirection: 'column',
  },
  producers: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '14px',
    fontSize: '1.6rem',
    alignItems: 'baseline',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
}
const OrganizationProducers = ({ organizationId, producers }) => {

  return (
    <div style={styles.counters}>
      <Counter style={styles.producers} value={producers.length} label="Producteurs" />
    </div>
  )
}

export default OrganizationProducers
