import React from 'react'
import PropTypes from 'prop-types'

import styles from './ProducersWrapper.scss'

const ProducersWrapper = ({ title, subtitle, producers, producersList }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div>
        <div>{title}</div>
        {subtitle ? <div className={styles.label}>{subtitle}</div> : null}
      </div>
      <div>{producers.length}</div>
    </div>
    {producersList}
  </div>
)

ProducersWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  producers: PropTypes.array.isRequired,
  producersList: PropTypes.any
}

export default ProducersWrapper
