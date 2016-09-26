import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.alternateTextColor,
      },
    }

    return (
      <div className="Menu">
        <AppBar
          title={<Link to={'/'} style={styles.title}>inspire.data.gouv.fr</Link>}
          onLeftIconButtonTouchTap={this.handleToggle}
          />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          >
          <AppBar title="inspire" />
          <Link to="/"><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></Link>
          <Link to="/catalogs"><MenuItem onTouchTap={this.handleClose}>Catalogs</MenuItem></Link>
        </Drawer>
      </div>
    )
  }
}

Menu.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default Menu
