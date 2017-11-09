import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'next/router'

import Facet from '../facet'

class ActiveFacets extends React.Component {
  static propTypes = {
    facets: PropTypes.array.isRequired,

    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired
    }).isRequired,
    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired
  }

  removeFacet = filter => {
    const { router, i18n } = this.props

    const query = {
      ...router.query
    }

    const match = query[filter.name]
    if (Array.isArray(match)) {
      query[filter.name] = match.filter(v => v !== filter.value)
    } else {
      delete query[filter.name]
    }

    const url = format({
      pathname: '/search',
      query
    })

    router.push(url, `/${i18n.language}${url}`)
  }

  render () {
    const { facets } = this.props

    return (
      <div>
        {facets.map(facet => (
          <span className='facet' key={`${facet.name}-${facet.value}`}>
            <Facet facet={facet} detailed remove onClick={this.removeFacet} />
          </span>
        ))}

        <style jsx>{`
          div {
            margin-top: 10px;
          }

          span {
            display: inline-block;
            margin: 0 5px 5px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default translate('search')(withRouter(ActiveFacets))
