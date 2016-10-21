import React, { Component } from 'react'
import customTheme from '../../customTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Content from '../Content/Content'

class App extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(customTheme)}
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <Content children={this.props.children} location={this.props.location} />
      </MuiThemeProvider>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default App
