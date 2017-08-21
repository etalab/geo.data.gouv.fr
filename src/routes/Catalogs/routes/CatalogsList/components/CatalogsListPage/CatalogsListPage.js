import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DocumentTitle from 'react-document-title'

import Loader from 'common/components/Loader'
import CatalogPreview from 'common/components/CatalogPreview'

import styles from './CatalogsListPage.scss'

class CatalogsListPage extends React.PureComponent {
  static propTypes = {
    catalogs: PropTypes.shape({
      catalogs: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired
      })).isRequired,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    fetchCatalogs: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchCatalogs } = this.props

    fetchCatalogs()
  }

  render () {
    const { catalogs, t } = this.props

    return (
      <DocumentTitle title={t('CatalogsListPage.documentTitle')}>
        <div className={styles.container}>
          <Loader isLoading={catalogs.pending} error={catalogs.error}>
            <div>
              {catalogs.catalogs.map(catalog => (
                <div key={catalog._id} className={styles.catalog} >
                  <CatalogPreview catalog={catalog} />
                </div>
              ))}
            </div>
          </Loader>
        </div>
      </DocumentTitle>
    )
  }
}

export default translate('Catalogs.CatalogsList')(CatalogsListPage)
