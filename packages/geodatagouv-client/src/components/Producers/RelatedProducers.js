import React from 'react'
import PropTypes from 'prop-types'

import styles from './RelatedProducers.scss'

const RelatedProducers = ({ producers, action }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div>Producteurs rattachés à votre organisation</div>
      <div>{producers.length}</div>
    </div>
    <div className={styles.list}>
      {producers.map((producer, idx) => (
        <div className={styles.producers} key={idx}>
          <div>{producer._id}</div>
          <button className={styles.dissociate} onClick={() => action(producer)}>Dissocier</button>
        </div>
      ))}
    </div>
  </div>
)

RelatedProducers.propTypes = {
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,
  action: PropTypes.func.isRequired
}

export default RelatedProducers
