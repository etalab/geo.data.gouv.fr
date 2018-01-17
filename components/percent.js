import PropTypes from 'prop-types'

import Counter from './counter'

const color = percent => {
  if (percent < 20) {
    return 'error'
  } else if (percent > 55) {
    return 'success'
  }

  return 'warning'
}

const Percent = props => {
  const {value, total, ...otherProps} = props

  const percent = value ? Math.floor((value / total) * 100) : 0

  return (
    <Counter
      value={percent}
      unit='%'
      color={color(percent)}
      {...otherProps}
    />
  )
}

Percent.propTypes = {
  value: PropTypes.number,
  total: PropTypes.number.isRequired
}

Percent.defaultProps = {
  value: 0
}

export default Percent
