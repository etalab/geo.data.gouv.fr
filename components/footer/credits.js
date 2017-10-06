import React from 'react'
import { translate, Interpolate } from 'react-i18next'

const Credits = () => (
  <div>
    <Interpolate
      i18nKey='components.Footer.madeBy'
      heart={<span>♥</span>}
      link={<a href='https://www.etalab.gouv.fr/'>Etalab</a>}
    />

    <style jsx>{`
      span, a {
        color: #fff;
      }
    `}</style>
  </div>
)

export default translate()(Credits)
