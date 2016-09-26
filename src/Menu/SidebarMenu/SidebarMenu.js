import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
  }

  change() {
    this.props.change()
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.change()}
        >
        <AppBar title="Inspire" />
        <MenuItem onTouchTap={this.props.handleClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.props.handleClose}>Menu Item 2</MenuItem>
      </Drawer>
    )
  }

}

export default SidebarMenu
