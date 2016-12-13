import React from 'react'
import { theme } from '../../tools'

const styles = {
  section: {
    paddingBottom: '2em',
    backgroundColor: '#fff',
    marginBottom: '2em',
    boxShadow: theme.boxShadowZ1,
  },
  header: {
    marginBottom: '1em',
    padding: '1em',
    fontSize: '1.3rem',
    color: 'black',
  },
  content: {
    margin: '1em',
  }
}

const Section = ({title, component}) => {
  return (
    <div style={styles.section}>
      <div style={styles.header}>{title}</div>
      <div style={styles.content}>
        {component}
      </div>
    </div>
  )
}

export default Section
