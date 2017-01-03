import React from 'react'
import { Link } from 'react-router'
import { data } from './DatasetToSelect.css'

const DatasetToSelect = ({ dataset, isSelected, change }) => {

  return (
    <div className={data}>
      <Link to={`/datasets/${dataset._id}`}>{dataset.title}</Link>
      <input type="checkbox" checked={isSelected} onChange={() => change(dataset)} />
    </div>
  )
}

export default DatasetToSelect
