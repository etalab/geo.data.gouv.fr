import React from 'react'
import Loader from '../Loader/Loader'
import { theme } from '../../tools'

const styles = {
  section: {
    paddingTop: '100px',
    paddingBottom: '2em',
    backgroundColor: '#fff',
    marginBottom: '2em',
    boxShadow: theme.boxShadowZ1,
  },
  header: {
    marginBottom: '1em',
    padding: '1em',
    fontSize: '1.5rem',
    color: 'black',
  },
}

const PublishingSection = ({ title, component, toWait }) => {
  return (
        <div style={styles.section}>
          <div style={styles.header}>{title}</div>
          <Loader value={toWait} component={component} />
        </div>
  )
}

export default PublishingSection
