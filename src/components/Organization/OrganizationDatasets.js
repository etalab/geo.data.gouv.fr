import React from 'react'
import PublishedDatasets from '../Dataset/PublishedDatasets'

const OrganizationDatasets = ({ published, notPublishedYet, publishedByOthers }) => {
  return (
    <div>
      <PublishedDatasets datasets={notPublishedYet} title={'Données en attente de publication'} status={'error'} />
      <PublishedDatasets datasets={published} title={'Données publiées'} status={'success'} />
      <PublishedDatasets datasets={publishedByOthers} title={'Données publiées par une autre organisation'} status={'warning'} />
    </div>
  )
}

export default OrganizationDatasets
