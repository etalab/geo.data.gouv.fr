import React from 'react'
import { Link } from 'react-router'
import Catalog from '../Catalog/Catalog'
import OrganizationMetrics from './OrganizationMetrics'
import OrganizationProducers from './OrganizationProducers'
import styles from './OrganizationCardSection.css'

const OrganizationCardSection = ({ organization, metrics }) => {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h4>Jeux de données</h4>
        <OrganizationMetrics metrics={metrics} organizationId={organization._id} />
      </div>

      <div className={styles.section}>
        <h4>Producteurs source</h4>
        <OrganizationProducers organizationId={organization._id} producers={organization.producers} />
      </div>

      <div className={styles.section}>
        <h4>Catalogues source</h4>
        <Catalog catalogId={organization.catalogSource} size={'small'} />
      </div>

      <div className={styles.previousPage}>
        <Link to={'/publication'}><i className="arrow left icon"></i> Retour aux organisations</Link>
      </div>
    </div>
  )
}

export default OrganizationCardSection
