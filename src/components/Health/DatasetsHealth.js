import React from 'react'
import { get } from 'lodash'
import Percent from '../Statistics/Percent/Percent'
import { isNotEnoughDownloadable, isNotEnoughOpen, isAlmostNotDownloadable, isAlmostNotOpen } from '../../helpers/catalogs'
import { container } from './HealthDetails.css'
import { section, chart, legend, success, warning, error } from './DatasetsHealth.css'

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
      </div>

      <div className={legend}>
        <div className={error}><i className="remove icon"></i>inférieur à 20%</div>
        <div className={warning}><i className="icon warning"></i>entre 20% et 55%</div>
        <div className={success}><i className="checkmark icon"></i>supérieur à 5%</div>
      </div>

    </div>
  )
}

export default DatasetsHealth
