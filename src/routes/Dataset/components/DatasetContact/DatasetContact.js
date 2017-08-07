import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import DatasetContactLabel from '../DatasetContactLabel'

import styles from './DatasetContact.scss'

const DatasetContact = ({ contact, t }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.name}>
        {contact.organizationName || t('Common:enums.unknownData.notSpecified')}
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
        <i className='call icon' /> {contact.phoneNumber || t('Common:enums.unknownData.notSpecified')}
      </div>

      <div>
        <i className='mail outline icon' /> {contact.email ? (
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        ) : t('Common:enums.unknownData.notSpecified', { context: 'female' })}
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
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetContact)
