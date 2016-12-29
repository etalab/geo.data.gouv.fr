import React from 'react'
import ObsoleteWarning from '../Catalog/ObsoleteWarning'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import { isObsolete, isNotSync } from '../../helpers/catalogs'
import { container } from './HealthDetails.css'
import { test, success, error } from './UpdateHealth.css'

const UpdateHealth = ({ catalog }) => {
  const isUpdate = isObsolete(catalog) ? <ObsoleteWarning catalog={catalog} /> : <div className={success}><i className="checkmark icon"></i>Ce catalogue est tenu à jour</div>
  const notSync = isNotSync(catalog)

  return (
    <div className={container}>
      <h2>Fraicheur du catalogue</h2>
      {isUpdate}
      <div className={`${test} ${notSync ? error : success}`}>
        <i className={notSync ? 'remove icon' : 'checkmark icon'}></i>Moissonnage
        <LastHarvestStatus harvest={catalog.service.sync} />
      </div>
    </div>
  )
}

export default UpdateHealth
