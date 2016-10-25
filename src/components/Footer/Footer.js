import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class Footer extends Component {
  render() {
    const style = {
      padding: 40,
      textAlign: 'center',

      color: 'white',
      backgroundColor: this.context.muiTheme.palette.primary2Color,
    }
    return (
      <footer>
        <Paper style={style} zDepth={0}>
          <p>Made with ♥ by the <a style={{ color: 'white' }}href="https://beta.gouv.fr">Digital Services Incubator</a></p>
        </Paper>
      </footer>
    )
  }
}

Footer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default Footer
