import React from 'react'
import OrganizationMetrics from './OrganizationMetrics'
import Catalog from '../Catalog/Catalog'
import Errors from '../Errors/Errors'
import OrganizationProducers from './OrganizationProducers'
import styles from './OrganizationCard.css'

const OrganizationCard = ({ organization, metrics, sourceCatalog, producers, errors }) => {
  const logo = organization.logo || 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
  let section

  if (errors.length) {
    section = <Errors errors={errors} />
  } else {
    section = (
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.organization}>
        <a href={organization.page} target="blank">
          <img className={styles.img} src={logo} alt={organization.slug} />
          <div className={styles.detail}>{organization.name}</div>
        </a>
      </div>
      {section}
    </div>
  )
}

export default OrganizationCard
