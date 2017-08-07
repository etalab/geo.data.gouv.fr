import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { isObsolete } from '../../helpers/catalogs'

import styles from './ObsoleteWarning.scss'

// When testing you may need to define the current date to avoid test cases obsolescence
export const ObsoleteWarning = ({ catalog, currentDate, t }) => {
  if (!isObsolete(catalog, currentDate)) return <span />

  return (
    <div className={styles.container}>
      <i className='icon warning' /> {t('components.ObsoleteWarning.obsoleteCatalog')}
    </div>
  )
}

ObsoleteWarning.propTypes = {
  catalog: PropTypes.object.isRequired,
  currentDate: PropTypes.object,
  t: PropTypes.func.isRequired
}

export default translate('Common')(ObsoleteWarning)
