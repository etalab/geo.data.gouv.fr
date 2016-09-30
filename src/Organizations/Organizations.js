import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import './Organizations.css'

class Organizations extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

  const styles = {
    tab: {
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5em',
     },
     label: {
       marginLeft: '1em',
       fontSize: '1em',
     },
  }

  return (
      <Paper style={styles.tab}>
        {Object.keys(this.props.organizations).map( (key, idx) =>
          <div style={styles.item} key={idx}>
            <div>{key}</div>
            <div style={styles.label} className="ui blue circular label"> {this.props.organizations[key]} </div>
        </div>
      )}
    </Paper>
    )
  }
}

export default Organizations
