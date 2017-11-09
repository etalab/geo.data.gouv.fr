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
    const groups = this.getFilterGroups()

    if (!groups.length) {
      return null
    }

    return (
      <div>
        {groups.map(({ name, values }) => (
          <FacetGroup
            key={name}
            name={name}
            values={values}
          />
        ))}

        <style jsx>{`
          div {
            margin-left: 2em;
            flex-basis: 272px;
            flex-shrink: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Facets
