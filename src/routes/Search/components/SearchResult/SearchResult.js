import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import Filter from 'common/components/Filter'
import MarkdownSummary from 'common/components/MarkdownSummary'

import styles from './SearchResult.scss'
import noThumbnail from './images/no-thumbnail.svg'

const { GEODATA_API_URL } = process.env

const SearchResult = ({ dataset, addFilter, t }) => (
  <div className={styles.container}>
    <Link to={`/datasets/${dataset.recordId}`} className={styles.dataset}>
      {dataset.metadata.thumbnails && dataset.metadata.thumbnails.length > 0 ? (
        <div className={styles.thumbnail}>
          <img src={`${GEODATA_API_URL}/records/${dataset.recordId}/thumbnails/${dataset.metadata.thumbnails[0].originalUrlHash}`} alt='thumbnail' />
        </div>
      ) : (
        <div className={`${styles.thumbnail} ${styles.noThumbnail}`}>
          <img src={noThumbnail} alt='no image available' />
        </div>
      )}

      <div className={styles.content}>
        <div>
          <div className={styles.title}>
            <h3>{dataset.metadata.title}</h3>

            {dataset.metadata.inspireTheme && (
              <div className={styles.inspire}>
                <img src={`/assets/inspire-icons/${dataset.metadata.inspireTheme.id}.svg`} alt='Inspire theme' />
              </div>
            )}
          </div>

          {dataset.metadata.description && (
            <MarkdownSummary markdown={dataset.metadata.description} />
          )}
        </div>

        {/* <div className={styles.filters}>
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
        </div> */}
      </div>
    </Link>
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
