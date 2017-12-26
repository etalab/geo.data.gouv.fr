import React from 'react'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      action: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired
    })).isRequired
  }

  state = {
    visible: false
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.closeDropdown)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.closeDropdown)
  }

  setDropdownRef = node => {
    this.dropdownRef = node
  }

  toggleDropdown = e => {
    e.preventDefault()

    this.setState(state => ({
      visible: !state.visible
    }))
  }

  closeDropdown = event => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState(() => ({
        visible: false
      }))
    }
  }

  render() {
    const {title, links} = this.props
    const {visible} = this.state

    return (
      <div ref={this.setDropdownRef} className='dropdown' onClick={this.toggleDropdown}>
        <a>{title}</a>

        {visible && (
          <div className='content'>
            {links.map(link => <div key={link.text} onClick={link.action}>{link.text}</div>)}
          </div>
        )}

        <style jsx>{`
          @import 'colors';

          .dropdown {
            position: relative;
            display: inline-block;
            cursor: pointer;
          }

          a {
            color: $black;

            @media (min-width: 552px) {
              padding: 0.4em 0.8em;
              border-radius: 3px;

              &:hover {
                background: $hoverblue;
                transition: background ease-out 0.5s;
              }
            }
          }

          .content {
            position: absolute;
            background-color: $white;
            width: 100px;
            right: 0;
            text-align: left;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            z-index: 2;

            div {
              color: $black;
              padding: 12px 16px;
              text-decoration: none;
              display: block;

              &:hover {
                background-color: $lightgrey;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Dropdown
