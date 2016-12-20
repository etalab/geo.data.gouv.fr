import React from 'react'
import OrganizationCardSection from './OrganizationCardSection'
import styles from './OrganizationCard.css'

const OrganizationCard = ({ ...props }) => {
  const { organization } = props
  const logo = organization.logo || 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

  return (
    <div className={styles.container}>
      <a className={styles.organization} href={organization.page} target="blank">
        <img className={styles.img} src={logo} alt={organization.slug} />
        <div className={styles.detail}>{organization.name}</div>
      </a>
      <OrganizationCardSection {...props}/>
    </div>
  )
}

export default OrganizationCard
