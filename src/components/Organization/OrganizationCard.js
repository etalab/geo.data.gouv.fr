import React from 'react'
import { Link } from 'react-router'
import { theme } from '../../tools'

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: theme.boxShadowZ1,
    maxWidth: '200px',
  },
  img: {
    padding: '10px',
    maxHeight: '120px',
    maxWidth: '200px',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.blue,
  },
}

const OrganizationCard = ({ organization }) => {
  const logo = organization.logo || 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

  return (
    <Link style={styles.section} to={`/catalogs/${organization.id}`}>
      <img style={styles.img} src={logo} alt={organization.slug} />
      <div style={styles.detail}>{organization.name}</div>
    </Link>
  )
}

export default OrganizationCard
