import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styles from './OrganizationProducersPreview.scss'

const OrganizationProducersPreview = ({ organizationId, producers }) => (
  <div>
    <div><strong>{producers.length}</strong> producteurs sont associés à votre organisation</div>
    <Link className={styles.link} to={`/publication/${organizationId}/producers`}>Associer des producteurs</Link>
  </div>
)

OrganizationProducersPreview.propTypes = {
  organizationId: PropTypes.string.isRequired,
  producers: PropTypes.array.isRequired
}

export default OrganizationProducersPreview
