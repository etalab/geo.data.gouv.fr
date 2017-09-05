import React from 'react'
import PropTypes from 'prop-types'

import styles from './ChartContainer.scss'

const withContainer = Component => class extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { title, ...otherProps } = this.props

    return (
      <div className={styles.container}>
        <h3>{title}</h3>
        <Component {...otherProps} />
      </div>
    )
  }
}

export default withContainer
