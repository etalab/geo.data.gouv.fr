import React from 'react'
import PropTypes from 'prop-types'

import styles from './Loader.scss'

const Loader = ({ loading, label = 'Chargement…',  className = '', error, children }) => (
  loading ? (
    <div className={`${styles.wrapper} ${className}`}>
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

  className: PropTypes.string,

  error: PropTypes.oneOfType([
    PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    PropTypes.bool
  ]),

  children: PropTypes.node
}

export default Loader
