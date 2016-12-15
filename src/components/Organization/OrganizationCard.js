import React from 'react'
import OrganizationMetrics from './OrganizationMetrics'
import Catalog from '../Catalog/Catalog'
import OrganizationErrors from './OrganizationErrors'
import OrganizationProducers from './OrganizationProducers'
import { theme } from '../../tools'

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    margin: '1em',
    backgroundColor: 'white',
    boxShadow: theme.boxShadowZ1,
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flexGrow: 1,
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.blue,
    padding: '2em',
  },
  img: {
    maxHeight: '120px',
    maxWidth: '200px',
    marginBottom: '10px',
    borderRadius: '60px',
  },
  detail: {
    color: '#fff',
    fontSize: '1rem',
  },
}

const OrganizationCard = ({ organization, metrics, sourceCatalog, producers, errors }) => {
  const logo = organization.logo || 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
  let section

  if (errors.length) {
    section = <OrganizationErrors errors={errors} />
    styles.organization.backgroundColor = theme.red
  } else {
    section = <div style={styles.section}>
                <OrganizationMetrics metrics={metrics} />
                <OrganizationProducers organizationId={organization.id} producers={producers} />
                <Catalog catalogId={sourceCatalog} />
              </div>
  }

  return (
    <div style={styles.card}>
      <a style={styles.organization} href={organization.page} target="blank">
        <img style={styles.img} src={logo} alt={organization.slug} />
        <div style={styles.detail}>{organization.name}</div>
      </a>
      {section}
    </div>
  )
}

export default OrganizationCard
