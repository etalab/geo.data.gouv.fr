import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class Footer extends Component {
  render() {
    const blockStyle = {
      position: 'absolute',
      width: '100%',
      bottom: 0,
    }

    const style = {
      padding: 40,
      textAlign: 'center',

      color: 'white',
      backgroundColor: this.context.muiTheme.palette.primary2Color,
    }
    return (
      <footer style={blockStyle}>
        <Paper style={style} zDepth={0}>
          <p>Fait avec ♥ par l'Incubateur de services numériques</p>
        </Paper>
      </footer>
    )
  }
}

Footer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default Footer
