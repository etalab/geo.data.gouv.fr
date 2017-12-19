import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({value, label, unit, size, color, title}) => (
  <div>
    {title && <h3>{title}</h3>}
    <div className={`value ${color}`}>
      {value || 0}{unit && <span className='unit'>{unit}</span>}
    </div>
    {label && <div className={size}>{label}</div>}

    <style jsx>{`
      @import 'colors';

      .value {
        font-size: 2.2rem;
        line-height: 1;
      }

      .unit {
        font-size: 1rem;
        margin-left: 0.2rem;
      }

      // Colors
      .success {
        color: $green;
      }

      .warning {
        color: $yellow;
      }

      .error {
        color: $red;
      }

      // Sizes
      .small {
        font-size: 0.8rem;
        line-height: 1;
      }
    `}</style>
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  unit: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.oneOf([
    '',
    'small'
  ]),
  color: PropTypes.oneOf([
    '',
    'success',
    'warning',
    'error'
  ])
}

Counter.defaultProps = {
  label: null,
  unit: null,
  title: null,
  size: '',
  color: ''
}

export default Counter
