import React, { Component } from 'react'

class NotFind extends Component {
  render() {
    const styles = {
      notFind: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ffffff',
        fontSize: '2em',
        position: 'absolute',
        top: '25%',
        right: 'calc(50% + -100px)',
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
