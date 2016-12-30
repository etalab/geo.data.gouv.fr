import React from 'react'
import { get } from 'lodash'
import Percent from '../Statistics/Percent/Percent'
import UndefinedDatasets from './UndefinedDatasets'
import { isNotEnoughDownloadable, isNotEnoughOpen, isAlmostNotDownloadable, isAlmostNotOpen, isNoneType } from '../../helpers/catalogs'
import { container } from './HealthDetails.css'
import { section, chart } from './DatasetsHealth.css'
import { success, warning, error } from './Health.css'

const DatasetsHealth = ({ catalog }) => {
  let openness, download

  if (isAlmostNotOpen(catalog)) {
    openness = <div className={error}><i className="remove icon"></i>Le pourcentage de données ouvertes est trop faible</div>
  } else if (isNotEnoughOpen(catalog)) {
    openness = <div className={warning}><i className="icon warning"></i>Le pourcentage de données ouvertes est faible</div>
  } else {
    openness = <div className={success}><i className="checkmark icon"></i>Le pourcentage de données ouvertes est bon</div>
  }

  if (isAlmostNotDownloadable(catalog)) {
    download = <div className={error}><i className="remove icon"></i>Le pourcentage de données téléchargeable est trop faible</div>
  } else if (isNotEnoughDownloadable(catalog)) {
    download = <div className={warning}><i className="icon warning"></i>Le pourcentage de données téléchargeable est faible</div>
  } else {
    download = <div className={success}><i className="checkmark icon"></i>Le pourcentage de données téléchargeable est bon</div>
  }

  return (
    <div className={container}>

      <h2>Indicateurs concernant les jeux de données</h2>

      <div className={section}>
        <div className={chart}>
          <Percent value={get(catalog.metrics, 'datasets.partitions.openness.yes', 0)} total={catalog.metrics.datasets.totalCount} size="large" icon="unlock alternate icon" title="Pourcentage de données ouvertes" />
          {openness}
        </div>

        <div className={chart}>
          <Percent value={get(catalog.metrics, 'datasets.partitions.download.yes', 0)} total={catalog.metrics.datasets.totalCount} size="large" icon="download" title="Pourcentage de jeu de données téléchargeable" />
          {download}
        </div>

        {isNoneType(catalog) ? <UndefinedDatasets catalog={catalog} /> : null}

      </div>

    </div>
  )
}

export default DatasetsHealth
