import React from 'react'
import PropTypes from 'prop-types'

import DatasetContactLabel from '../DatasetContactLabel'

import styles from './DatasetContact.scss'

const DatasetContact = ({ contact }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.name}>
        {contact.organizationName || 'Non renseigné'}
      </div>

      <DatasetContactLabel role={contact.role} />
    </div>

    {contact.address && (
      <div>
        {contact.address[0]} {contact.town} - {contact.postalCode} {contact.country}
      </div>
    )}

    <div className={styles.contact}>
      <div>
        <i className="call icon" /> {contact.phoneNumber || 'Non renseigné'}
      </div>

      <div>
        <i className="mail outline icon" /> {contact.email ? (
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        ) : 'Non renseigné'}
      </div>
    </div>
  </div>
)

DatasetContact.propTypes = {
  contact: PropTypes.shape({
    organizationName: PropTypes.string,
    role: PropTypes.string.isRequired,
    address: PropTypes.arrayOf(PropTypes.string),
    town: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string
  }).isRequired
}

export default DatasetContact
