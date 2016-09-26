import React, { Component } from 'react'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

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
        paddingTop: 10,
        paddingBottom: 10,
      },
      toolBar: {
        WebkitBorderRadius: 4,
        MozBorderRadius: 4,
        borderRadius: 4,
        marginBottom: this.state.open ? 20: 5,
      },
      component: {
        padding: 20,
        display: this.state.open ? 'block' : 'none',
      }
    }

    return (
      <div>
        <Toolbar style={styles.toolBar}>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton onClick={this.handleClick}>
              {expandIcon}
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.component}>
          {this.props.component}
        </div>
      </div>
      )
  }

}

export default Section
