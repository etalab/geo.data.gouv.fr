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

  toggleDropDown = e => {
    e.preventDefault()

    this.setState(state => ({
      visible: !state.visible
    }))
  }

  render() {
    const { title, children } = this.props
    const { visible } = this.state

    return (
      <div className={styles.dropdown} onClick={this.toggleDropDown}>
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
