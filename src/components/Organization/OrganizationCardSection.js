import React from 'react'
import Catalog from '../Catalog/Catalog'
import OrganizationMetrics from './OrganizationMetrics'
import OrganizationProducers from './OrganizationProducers'
import styles from './OrganizationCardSection.css'

const OrganizationCardSection = ({ organization, metrics, catalog }) => {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h4>Jeux de données</h4>
        <OrganizationMetrics metrics={metrics} organizationId={organization.id} />
      </div>

      <div className={styles.section}>
        <h4>Producteurs source</h4>
        <OrganizationProducers organizationId={organization.id} producers={organization.producers} />
      </div>

      <div className={styles.section}>
        <h4>Catalogue source</h4>
        <Catalog catalogId={catalog.id} size={'small'} />
      </div>
    </div>
  )
}

export default OrganizationCardSection
