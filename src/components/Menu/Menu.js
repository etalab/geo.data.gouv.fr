import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import LinkIcon from 'material-ui/svg-icons/editor/insert-link'
import SyncIcon from 'material-ui/svg-icons/action/autorenew'
import BookIcon from 'material-ui/svg-icons/action/book'
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
          title={<Link to={'/'} style={styles.title}>inspire.beta.gouv.fr</Link>}
          onLeftIconButtonTouchTap={this.handleToggle}
          />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          desktop={true}
          >
          <AppBar title="inspire" showMenuIconButton={false}/>
          <Subheader>Explore</Subheader>
          <Link to="/catalogs"><MenuItem rightIcon={<BookIcon/>} onTouchTap={this.handleClose}>Catalogs</MenuItem></Link>
          <Divider/>
          <Subheader>Tools</Subheader>
          <MenuItem disabled={true} rightIcon={<LinkIcon/>}>Analyze a link</MenuItem>
          <MenuItem disabled={true} rightIcon={<SyncIcon/>}>Harvest a CSW</MenuItem>
          <MenuItem disabled={true} rightIcon={<SyncIcon/>}>Analyze a WFS</MenuItem>
        </Drawer>
      </div>
    )
  }
}

Menu.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default Menu
