import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Table from './table'

const Harvests = ({ catalog, harvests, t }) => {
  return (
    <section>
      <div>
        <Table catalog={catalog} harvests={harvests} />
      </div>
      <div />

      <style jsx>{`
        section {
          display: flex;
        }

        div {
          flex: 1 1;
        }
      `}</style>
    </section>
  )
}

Harvests.propTypes = {
  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,
  harvests: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Harvests)
