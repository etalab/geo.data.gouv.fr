import React from 'react'

import { other } from './OtherDownload.scss'

const OtherDownload = ({ distributions }) => {
  return (
    <div className={other}>
      <h4>Autres Données</h4>
      {
        distributions.map((distribution, idx) => {
          if (distribution.available) {
            return <a key={idx} href={distribution.location}>{distribution.name}</a>
          }
          return <div key={idx}>{distribution.name}</div>
        })
      }
    </div>
  )
}

export default OtherDownload
