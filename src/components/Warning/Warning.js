import React from 'react'
import PropTypes from 'prop-types'
import { Sticky } from 'react-sticky'

import styles from './Warning.scss'

class Warning extends React.PureComponent {
  static propTypes = {
    error: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    error: false
  }

  state = {
    displayed: true
  }

  closeWarning = () => {
    this.setState({
      displayed: false
    })
  }

  render() {
    const { displayed } = this.state

    if (!displayed) return

    const { error, title, children } = this.props
    const color = error ? styles.errorStyle : styles.warning

    return (
      <Sticky className={`${styles.sticky} ${color}`}>
        <div className={styles.content}>
          <div className={styles.bold}>{title}</div>
          {children}
        </div>
        <div className={styles.closeIcon} onClick={this.closeWarning}>
          <i className='big remove icon' />
        </div>
      </Sticky>
    )
  }
}

export default Warning
