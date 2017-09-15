import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Filter from 'common/components/Filter'
import Markdown from 'common/components/Markdown'

import styles from './SearchResult.scss'
import noThumbnail from './images/no-thumbnail.svg'

const { INSPIRE_API_URL } = process.env

const SearchResult = ({ dataset, addFilter, t }) => (
  <div className={styles.container}>
    <Link to={`/datasets/${dataset.recordId}`} className={styles.dataset}>
      <div className={styles.thumbnail}>
        {dataset.metadata.thumbnails && dataset.metadata.thumbnails.length
          ? <img src={`${INSPIRE_API_URL}/records/${dataset.recordId}/thumbnails/${dataset.metadata.thumbnails[0].originalUrlHash}`} alt='thumbnail' />
          : <img src={noThumbnail} alt='no image available' />
        }
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <h3>{dataset.metadata.title}</h3>

          { dataset.metadata.description && (
            <Markdown markdown={dataset.metadata.description} ellipsis />
          )}
        </div>

        <div className={styles.metadata}>
          {dataset.metadata.inspireTheme && (
            <img src={`/assets/inspire-icons/${dataset.metadata.inspireTheme.id}.svg`} alt='Inspire theme' />
          )}
        </div>
      </div>
    </Link>

    <div className={styles.filters}>
      <div className={styles.facet}>
        <h5>{t('SearchResult.keywords', { context: dataset.metadata.keywords.length })}</h5>
        <div className={styles.list}>
          {dataset.metadata.keywords.map((keyword, idx) => (
            <Filter
              key={idx}
              onClick={addFilter}
              filter={{ value: keyword, name: 'keyword' }}
            />
          ))}
        </div>
      </div>

      <div className={styles.facet}>
        <h5>{t('SearchResult.organizations', { context: dataset.organizations.length })}</h5>
        <div className={styles.list}>
          {dataset.organizations.map((organization, idx) => (
            <Filter
              key={idx}
              onClick={addFilter}
              filter={{ value: organization, name: 'organization' }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

SearchResult.propTypes = {
  dataset: PropTypes.shape({
    recordId: PropTypes.string.isRequired,

    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      keywords: PropTypes.array.isRequired
    }).isRequired,

    organizations: PropTypes.array.isRequired
  }).isRequired,

  addFilter: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Search')(SearchResult)
