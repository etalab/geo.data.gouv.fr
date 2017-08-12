/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'

import { data, progress } from './DatasetToSelect.scss'

const DatasetToSelect = ({ dataset, isSelected, inProgress, change }) => {
  return (
    <div className={data}>
      <Link to={`/datasets/${dataset._id}`}>{dataset.title}</Link>
      { inProgress
        ? <div className={progress}>Publication en cours...</div>
        : <input type='checkbox' checked={isSelected} onChange={() => change(dataset)} />}
    </div>
  )
}

export default DatasetToSelect
