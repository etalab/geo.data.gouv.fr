import React from 'react'
import { container, header, label } from './ProducersWrapper.scss'

const ProducersWrapper = ({ title, subtitle, producers, producersList }) => {
  return (
    <div className={container}>
      <div className={header}>
        <div>
          <div>{title}</div>
          {subtitle ? <div className={label}>{subtitle}</div> : null}
        </div>
        <div>{producers.length}</div>
      </div>
      {producersList}
    </div>
  )
}

export default ProducersWrapper
