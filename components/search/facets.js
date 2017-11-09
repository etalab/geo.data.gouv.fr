import React from 'react'
import PropTypes from 'prop-types'

import FacetGroup from './facet-group'

class Facets extends React.Component {
  static propTypes = {
    facets: PropTypes.object.isRequired
  }

  filterTypes = ([name, values]) => {
    return name !== 'keyword' && values.length > 1
  }

  render () {
    const { facets } = this.props

    return (
      <div>
        {Object.entries(facets).filter(this.filterTypes).map(([name, values]) => (
          <FacetGroup key={name} name={name} values={values} />
        ))}
      </div>
    )
  }
}

export default Facets
