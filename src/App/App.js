import React, { Component } from 'react'
import CustomTheme from '../CustomTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Content from '../Content/Content'

class App extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(CustomTheme)}
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(CustomTheme)}>
        <Content children={this.props.children} location={this.props.location} />
      </MuiThemeProvider>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default App
