import React from 'react'
import PropTypes from 'prop-types'

import FacetGroup from './facet-group'

class Facets extends React.Component {
  static propTypes = {
    facets: PropTypes.object.isRequired,
    active: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }))
  }

  getFilterGroups = () => {
    const { facets, active } = this.props

    return Object
      .entries(facets)
      .filter(([name]) => name !== 'keyword')
      .map(([name, values]) => ({
        name,
        values: values.filter(v => !active.some(a => a.name === name && a.value === v.value))
      }))
      .filter(group => group.values.length > 1)
  }

  render () {
    return (
      <div>
        {this.getFilterGroups().map(({ name, values }) => (
          <FacetGroup
            key={name}
            name={name}
            values={values}
          />
        ))}
      </div>
    )
  }
}

export default Facets
