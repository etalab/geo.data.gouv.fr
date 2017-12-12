import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Facet from '../facet'

class FacetGroup extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })).isRequired,

    t: PropTypes.func.isRequired
  }

  render () {
    const { name, values, t } = this.props

    return (
      <div className='main'>
        <h4>{t(`common:facets.types.${name}`)}</h4>
        {values.map(facet => (
          <div className='facet' key={facet.value}>
            <Facet
              facet={{ name, value: facet.value }}
              count={facet.count}
            />
          </div>
        ))}

        <style jsx>{`
          .main {
            margin-bottom: 15px;
          }

          h4 {
            font-variant: small-caps;
            font-weight: normal;
            line-height: 1;
            margin: 0 0 10px 0;
          }

          .facet {
            margin-bottom: 5px;
          }
        `}</style>
      </div>
    )
  }
}

export default translate('search')(FacetGroup)
