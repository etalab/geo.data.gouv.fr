import React from 'react'
import { translate } from 'react-i18next'

import { isObsolete } from '../../helpers/catalogs'
import { container } from './ObsoleteWarning.scss'

// When testing you may need to define the current date to avoid test cases obsolescence
export const ObsoleteWarning = ({ catalog, currentDate, t }) => {
  if (!isObsolete(catalog, currentDate)) return <span />

  return (
    <div className={container}>
      <i className="icon warning"></i> {t('ObsoleteWarning.obsoleteCatalog')}
    </div>
  )
}

export default translate('Common')(ObsoleteWarning)
