import React from 'react'
import Organizations from '../../Organizations/Organizations'

const OrganizationsSection = ({metrics}) => {
  return (
    <div className="ui equal width stackable grid">
      <div className="column">
        <Organizations label="Organizations" organizations={metrics.counts.organizations} />
      </div>

      <div className="column">
        <Organizations label="Keywords" organizations={metrics.counts.keywords} />
      </div>
    </div>
      )
}

export default OrganizationsSection
