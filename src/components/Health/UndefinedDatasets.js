import React from 'react'
import { get } from 'lodash'
import Percent from '../Statistics/Percent/Percent'
import { section, chart } from './UndefinedDatasets.css'

const UndefinedDatasets = ({ catalog }) => {
  const dataType = get(catalog.metrics, 'datasets.partitions.dataType.none', 0)
  const recordType = get(catalog.metrics, 'records.partitions.recordType.none', 0)

  const dataTypePercent = !dataType ? null :
      <div className={chart}>
        <Percent value={dataType} total={catalog.metrics.datasets.totalCount} size="large" icon="help icon" title="Pourcentage de type de données non défini" />
      </div>
  const recordTypePercent = !recordType ? null :
      <div className={chart}>
        <Percent value={recordType} total={catalog.metrics.records.totalCount} size="large" icon="help icon" title="Pourcentage de type d'enregistrement non défini" />
      </div>

  return (
    <div className={section}>
      {dataTypePercent}
      {recordTypePercent}
    </div>
  )
}

export default UndefinedDatasets
