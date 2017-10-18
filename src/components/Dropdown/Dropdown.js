import React from 'react'
import PropTypes from 'prop-types'

import styles from './Dropdown.scss'

class Dropdown extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
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

  closeDropdown = e => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState(() => ({
        visible: false
      }))
    }
  }

  render() {
    const { title, children } = this.props
    const { visible } = this.state

    return (
      <div className={styles.dropdown} onClick={this.toggleDropdown} ref={this.setDropdownRef}>
        <a>{title}</a>

        {visible && (
          <div className={styles.content}>
            {children}
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
