import React from 'react'

import { container, infos } from './Producer.css'

const Producer = ({ producer }) => {
  if (!producer) return <div>Information indisponible</div>

  return (
    <div className={container}>
      <div><img src={producer.logo || '/assets/no-img.png'} alt="producer logo" /></div>
      <div className={infos}>
        <div><b>{producer.producers.length}</b> producteurs</div>
        <div><b>{producer.datasets.length}</b> jeux de données</div>
      </div>
    </div>
  )
}

export default Producer
