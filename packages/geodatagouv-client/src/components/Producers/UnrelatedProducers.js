import React from 'react'
import PropTypes from 'prop-types'

import styles from './UnrelatedProducers.scss'

const UnrelatedProducers = ({ producers, action }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div>
        <div>Producteurs non rattachés</div>
        <div className={styles.subtitle}>Ajoutez les producteurs dont vous souhaitez que les données ouvertes soient publiées dans votre organisation.</div>
      </div>
      <div>{producers.length}</div>
    </div>
    <div className={styles.list}>
      {producers.map((producer, idx) => (
        <div className={styles.producers} key={idx}>
          <div>{producer._id}</div>
          <button className={styles.associate} onClick={() => action(producer)}>Associer</button>
        </div>
      ))}
    </div>
  </div>
)

UnrelatedProducers.propTypes = {
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,
  action: PropTypes.func.isRequired
}

export default UnrelatedProducers
