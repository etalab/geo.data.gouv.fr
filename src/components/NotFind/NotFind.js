import React, { Component } from 'react'
import { theme } from '../../tools'

class NotFind extends Component {
  render() {
    const styles = {
      notFind: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.blue,
        fontSize: '2em',
      },
      header: {
        fontSize: '4em',
      }
    }
    return (
      <div style={styles.notFind} className="notFind">
        <h1 style={styles.header}>404</h1>
        <p>Page non trouvée</p>
      </div>
    )
  }
}

export default NotFind
