import React from 'react'
import style from './RelatedProducers.css'

const RelatedProducers = ({ producers, action }) => {

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>Producteurs rattachés à votre organisation</div>
        <div>{producers.length}</div>
      </div>
      <div className={style.list}>
        {producers.map((producer, idx) => (
          <div className={style.producers} key={idx}>
            <div>{producer._id}</div>
            <button className={style.dissociate} onClick={() => action(producer)}>Dissocier</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducers
