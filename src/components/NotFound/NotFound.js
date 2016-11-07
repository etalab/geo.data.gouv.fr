import React from 'react'
import { theme } from '../../tools'

const styles = {
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.blue,
    fontSize: '2em',
    marginTop: '2em',
  },
  header: {
    fontSize: '4em',
  }
}

const NotFound = () => (
  <div style={styles.notFound}>
    <h1 style={styles.header}>404</h1>
    <p>Page non trouvée</p>
  </div>
)

export default NotFound
