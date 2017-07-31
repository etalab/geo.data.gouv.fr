import React from 'react'
import PropTypes from 'prop-types'

import styles from './DatasetLinks.scss'

const DatasetLinks = ({ links }) => (
  <ul className={styles.container}>
    {links.map((link, idx) => (
      <li key={idx}>
        <a href={link.href}>{link.name || link.href}</a>
      </li>
    ))}
  </ul>
)

DatasetLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string.isRequired
  })).isRequired
}

export default DatasetLinks
