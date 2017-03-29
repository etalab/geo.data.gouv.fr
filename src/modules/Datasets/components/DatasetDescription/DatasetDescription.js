import React from 'react'
import { prune } from 'underscore.string'

import MarkdownViewer from '../Markdown/MarkdownViewer'

import style from './DatasetDescription.css'

const DatasetDescription = ({description, shortDescription, showMore}) => {
  if (!description || !description.length) return <div>Aucune description.</div>
  const action = (description && description.length > 1000) ? <button className={style.action} onClick={() => showMore()}>{shortDescription ? 'Afficher la suite' : 'Réduire'}</button> : null

  return (
    <div className={style.container}>
      <MarkdownViewer markdown={shortDescription ? prune(description, 1000) : description} />
      {action}
    </div>
  )
}

export default DatasetDescription
