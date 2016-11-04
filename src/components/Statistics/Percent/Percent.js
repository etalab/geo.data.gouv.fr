import React from 'react'
import Counter from '../Counter/Counter'
import { theme } from '../../../tools'

const Percent = (props) => {
  const { value, total } = props
  const percent = value ? Math.floor((value / total) * 100) : 0
  const color = () => {
    if (percent < 20) {
      return theme.red
    } else if (percent > 55) {
      return theme.green
    } else {
      return theme.yellow
    }
  }

  return (
    <Counter
      {...props}
      value={percent}
      unit="%"
      color={color()}/>
  )
}

export default Percent
