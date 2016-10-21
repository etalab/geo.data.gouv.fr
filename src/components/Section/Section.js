import React, { Component } from 'react'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import NavigationExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'

class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {open: true}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({open: !this.state.open})
  }

  render() {
    const expandIcon = this.state.open ? <NavigationExpandLessIcon /> : <NavigationExpandMoreIcon />
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
        display: this.state.open ? '' : 'none',
      }
    }

    return (
      <div style={styles.section}>
        <div style={styles.header}>
          <h3>{this.props.title}</h3>
          <IconButton onClick={this.handleClick}>
            {expandIcon}
          </IconButton>
        </div>
        <Divider />
        <div style={styles.component}>
          {this.props.component}
        </div>
      </div>
      )
  }

}

export default Section
