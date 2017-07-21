import React from 'react'
import PropTypes from 'prop-types'

import styles from './Loader.scss'

const Loader = ({ loading, label = 'Chargement…', error, children }) => (
  loading ? (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        {label}
      </div>
    </div>
  ) : error ? (
    <div className={styles.error}>
      Une erreur est survenue : {error.message}.
    </div>
  ) : children
)

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string,

  error: PropTypes.oneOfType([
    PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    PropTypes.bool
  ]),

  children: PropTypes.node
}

export default Loader
