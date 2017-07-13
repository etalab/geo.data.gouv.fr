import React from 'react'
import style from './UnrelatedProducers.scss'

const UnrelatedProducers = ({ producers, action }) => {

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <div>Producteurs non rattachés</div>
          <div className={style.subtitle}>Ajoutez les producteurs dont vous souhaitez que les données ouvertes soient publiées dans votre organisation.</div>
        </div>
        <div>{producers.length}</div>
      </div>
      <div className={style.list}>
        {producers.map((producer, idx) => (
          <div className={style.producers} key={idx}>
            <div>{producer._id}</div>
            <button className={style.associate} onClick={() => action(producer)}>Associer</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UnrelatedProducers
