import React from 'react'
import { Link } from 'react-router'
import DatasetsPublication from '../Dataset/DatasetsPublication'
import { previousPage } from './OrganizationDatasets.css'

const OrganizationDatasets = ({ published, notPublishedYet, publishedByOthers, organizationId }) => {
  return (
    <div>
      <DatasetsPublication datasets={notPublishedYet} organizationId={organizationId} title={'Données en attente de publication'} status={'error'} />
      <DatasetsPublication datasets={published} organizationId={organizationId} title={'Données publiées'} status={'success'} />
      <DatasetsPublication datasets={publishedByOthers} organizationId={organizationId} title={'Données publiées par une autre organisation'} status={'warning'} />
      <div className={previousPage}>
        <Link to={'/publication'}><i className="arrow left icon"></i> Retour aux organisations</Link>
      </div>
    </div>
  )
}

export default OrganizationDatasets
