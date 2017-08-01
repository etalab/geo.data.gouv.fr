import React from 'react'
import PropTypes from 'prop-types'

import DatasetContact from '../DatasetContact'

import styles from './DatasetContactList.scss'

const DatasetContactList = ({ contacts }) => (
  <div>
    {contacts.map((contact, idx) => (
      <div key={idx} className={styles.wrapper}>
        <DatasetContact contact={contact} />
      </div>
    ))}
  </div>
)

DatasetContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired
}

export default DatasetContactList
