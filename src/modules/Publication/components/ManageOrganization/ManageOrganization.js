/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'

import OrganizationProducersPreview from '../OrganizationProducersPreview/OrganizationProducersPreview'
import OrganizationMetrics from '../OrganizationMetrics/OrganizationMetrics'

import SourceCatalogs from '../SourceCatalogs/SourceCatalogs'

import styles from './ManageOrganization.scss'

const ManageOrganization = ({ organization, metrics }) => {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h4>Catalogues source</h4>
        <SourceCatalogs organizationId={organization._id} sourceCatalogs={organization.sourceCatalogs} />
      </div>

      <div className={styles.section}>
        <h4>Producteurs source</h4>
        <OrganizationProducersPreview organizationId={organization._id} producers={organization.producers} />
      </div>

      <div className={styles.section}>
        <h4>Jeux de données</h4>
        <OrganizationMetrics metrics={metrics} organizationId={organization._id} />
      </div>

      <div className={styles.previousPage}>
        <Link to={'/publication'}><i className='arrow left icon' /> Retour aux organisations</Link>
      </div>
    </div>
  )
}

export default ManageOrganization
