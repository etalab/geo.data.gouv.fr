import React from 'react'
import { Link } from 'react-router'
import styles from './OrganizationPreview.css'

const OrganizationPreview = ({ organization }) => {
  const logo = organization && organization.logo ? organization.logo : '/assets/no-img.png'

  return (
    <div className={styles.container}>
      <Link className={styles.organization} to={`/publication/${organization.id}`}>
        <img className={styles.img} src={logo} alt={organization.slug} />
        <div className={styles.detail}>{organization.name}</div>
      </Link>
    </div>
  )
}

export default OrganizationPreview
