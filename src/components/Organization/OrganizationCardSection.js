import React from 'react'
import Errors from '../Errors/Errors'
import Catalog from '../Catalog/Catalog'
import OrganizationMetrics from './OrganizationMetrics'
import OrganizationProducers from './OrganizationProducers'
import styles from './OrganizationCardSection.css'

const OrganizationCardSection = ({ organization, metrics, sourceCatalog, producers, errors }) => {
  if (errors.length) {
    return <Errors errors={errors} />
  } else if (!errors.length) {
    return (
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>Jeux de données</h4>
          <OrganizationMetrics metrics={metrics} />
        </div>

        <div className={styles.section}>
          <h4>Producteurs source</h4>
          <OrganizationProducers organizationId={organization.id} producers={producers} />
        </div>

        <div className={styles.section}>
          <h4>Catalogue source</h4>
          <Catalog catalogId={sourceCatalog} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default OrganizationCardSection
