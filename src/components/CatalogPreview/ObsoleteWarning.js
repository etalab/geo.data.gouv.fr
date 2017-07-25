import React from 'react'
import { translate } from 'react-i18next'

import { isObsolete } from '../../helpers/catalogs'
import { container } from './ObsoleteWarning.scss'

// When testing you may need to define the current date to avoid test cases obsolescence
const ObsoleteWarning = ({ catalog, currentDate, t }) => {
  if (!isObsolete(catalog, currentDate)) return <span />

  return (
    <div className={container}>
      <i className="icon warning"></i> {t('obsolete_catalog')}
    </div>
  )
}

export default translate('ObsoleteWarning')(ObsoleteWarning)
