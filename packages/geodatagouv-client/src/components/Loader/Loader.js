import React from 'react'
import PropTypes from 'prop-types'

import styles from './Loader.scss'

const Loader = ({ isLoading, pastDelay, timedOut, label, className, error, children }) => {
  if (isLoading) {
    if (timedOut) {
      return (
        <div className={styles.error}>
          Le chargement a pris trop de temps, veuillez réessayer plus tard.
        </div>
      )
    }

    if (pastDelay) {
      return (
        <div className={`${styles.wrapper} ${className}`}>
          <div className={styles.loader}>
            {label}
          </div>
        </div>
      )
    }

    // In case pastDelay is specified with a falsy value, let’s not display
    // any loading as the component is ready to be displayed.
    return null
  }

  if (error) {
    return (
      <div className={styles.error}>
        Une erreur est survenue : {error.message}.
      </div>
    )
  }

  return children
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool,

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
  pastDelay: true,
  timedOut: false,

  label: 'Chargement…',
  className: ''
}

export default Loader
