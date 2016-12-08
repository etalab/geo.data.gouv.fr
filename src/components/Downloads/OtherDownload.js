import React from 'react'

const OtherDownload = ({ distributions, style }) => {
  return (
    <div style={style}>
      <h3>Autres Données</h3>
      {distributions.map((distribution, idx) => {
        if (distribution.available) {
          return <a key={idx} href={distribution.location}>{distribution.name}</a>          
        }
        return <div key={idx}>{distribution.name}</div>
      }
      )}
    </div>
  )
}

export default OtherDownload
