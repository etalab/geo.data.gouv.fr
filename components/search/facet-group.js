import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'next/router'

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

  addFacet = filter => {
    const { router, i18n } = this.props

    const query = {
      ...router.query
    }

    const match = query[filter.name]
    if (Array.isArray(match)) {
      query[filter.name].push(filter.value)
    } else if (match) {
      query[filter.name] = [match, filter.value]
    } else {
      query[filter.name] = filter.value
    }

    const url = format({
      pathname: '/search',
      query
    })

    router.push(url, `/${i18n.language}${url}`)
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
              onClick={this.addFacet}
            />
          </div>
        ))}

        <style jsx>{`
          .main {
            margin-bottom: 15px;
          }

          h4 {
            font-variant: small-caps;
            line-height: 1em;
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

export default translate('search')(withRouter(FacetGroup))
