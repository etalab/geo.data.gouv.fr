import React from 'react'
import Download from './Download'

const VectorDownload = ({ distributions, preview, choosePreview }) => {
  if (!distributions.length) {
    return <div>{'Aucune donnée n\'est téléchargeable.'}</div>
  }

  return (
    <div>
      <div>Sélectionner un format de téléchargement :</div>
      {distributions.map((distribution, idx) =>
        <Download
          key={idx}
          distribution={distribution}
          isPreview={preview && preview.distribution._id === distribution._id}
          preview={(preview) => choosePreview(preview)} />
      )}
    </div>
  )
}

export default VectorDownload
