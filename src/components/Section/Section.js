import React, { Component } from 'react'

class Section extends Component {
  render() {
    const styles = {
      section: {
        paddingTop: '2em',
        paddingBottom: '2em',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      component: {
        padding: 20,
      },
    }

    return (
      <div style={styles.section}>
        <div style={styles.header}>
          <h3>{this.props.title}</h3>
        </div>
        <hr />
        <div style={styles.component}>
          {this.props.component}
        </div>
      </div>
      )
  }

}

export default Section
