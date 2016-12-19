import React from 'react'
import PublishedDatasets from '../Dataset/PublishedDatasets'
import { theme } from '../../tools'

const styles = {
  published: {
    backgroundColor: theme.green
  },
  publishedByOthers: {
    backgroundColor: theme.yellow
  },
  notPublishedYet: {
    backgroundColor: theme.blue
  }
}

const OrganizationDatasets = ({ published, notPublishedYet, publishedByOthers }) => {
  return (
    <div>
      <PublishedDatasets datasets={notPublishedYet} title={'Données en attente de publication'} style={styles.notPublishedYet} />
      <PublishedDatasets datasets={published} title={'Données publiées'} style={styles.published} />
      <PublishedDatasets datasets={publishedByOthers} title={'Données publiées par une autre organisation'} style={styles.publishedByOthers} />
    </div>
  )
}

export default OrganizationDatasets
