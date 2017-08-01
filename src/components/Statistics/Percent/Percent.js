import React from 'react'
import Counter from '../Counter/Counter'

const color = (percent) => {
  if (percent < 20) {
    return 'error'
  } else if (percent > 55) {
    return 'success'
  } else {
    return 'warning'
  }
}

const Percent = (props) => {
  const { value, total } = props
  const percent = value ? Math.floor((value / total) * 100) : 0

  return (
    <Counter
      {...props}
      value={percent}
      unit='%'
      color={color(percent)} />
  )
}

export default Percent
