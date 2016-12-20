import React from 'react'
import Counter from '../Counter/Counter'

const HomepageCounter = (props) => {
  return (
    <Counter {...props} size="large" color="success" icon="database" />
  )
}

export default HomepageCounter
