/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'

import DatasetsPublication from '../DatasetsPublication/DatasetsPublication'

import { previousPage } from './OrganizationDatasets.scss'

const OrganizationDatasets = ({ published, notPublishedYet, publishedByOthers, update, organizationId }) => {
  return (
    <div>
      <DatasetsPublication datasets={notPublishedYet} organizationId={organizationId} title={'Données en attente de publication'} status={'error'} update={() => update()} />
      <DatasetsPublication datasets={published} organizationId={organizationId} title={'Données publiées'} status={'success'} />
      <DatasetsPublication datasets={publishedByOthers} organizationId={organizationId} title={'Données publiées par une autre organisation'} status={'warning'} />
      <div className={previousPage}>
        <Link to={`/publication/${organizationId}`}><i className='arrow left icon' /> retour</Link>
      </div>
    </div>
  )
}

export default OrganizationDatasets
