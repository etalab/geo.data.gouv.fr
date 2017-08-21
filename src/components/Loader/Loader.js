import React from 'react'
import PropTypes from 'prop-types'

import styles from './Loader.scss'

const Loader = ({ isLoading, label, className, error, children }) => (
  isLoading ? (
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
  isLoading: PropTypes.bool,
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

Loader.defaultProps = {
  isLoading: false,
  label: 'Chargement…',
  className: ''
}

export default Loader
