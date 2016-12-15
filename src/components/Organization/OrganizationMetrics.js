import React from 'react'
import Counter from '../Statistics/Counter/Counter'
import { theme } from '../../tools'

const styles = {
  counters: {
    display: 'flex',
    flexDirection: 'column',
  },
  counter: {
    display: 'flex',
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
const OrganizationMetrics = ({ organizationId, metrics }) => {
  const { published, notPublishedYet, publishedByOthers} = metrics

  return (
    <div style={styles.counters}>
      <h4>Jeux de données</h4>
      <Counter style={styles.counter} value={published} label="Publiés" color={theme.green} />
      <Counter style={styles.counter} value={notPublishedYet} label="En attente de publication" color={theme.red} />
      <Counter style={styles.counter} value={publishedByOthers} label="Publiés par d'autres producteurs" color={theme.yellow} />
    </div>
  )
}

export default OrganizationMetrics
