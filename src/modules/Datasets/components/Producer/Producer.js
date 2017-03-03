import React from 'react'

import { container } from './Producer.css'

const Producer = ({ producer }) => {
  if (!producer) return <div>Information indisponible</div>

  return (
    <div className={container}>
      <img src={producer.logo || '/assets/avatar.png'} alt="producer logo" />
      <h4>{producer.name}</h4>
    </div>
  )
}

export default Producer
