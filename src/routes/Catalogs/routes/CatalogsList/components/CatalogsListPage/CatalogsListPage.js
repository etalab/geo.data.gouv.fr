import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Helmet } from 'react-helmet'

import Loader from 'common/components/Loader'
import CatalogPreview from 'common/components/CatalogPreview'

import styles from './CatalogsListPage.scss'
import clouds from '../../../../../../components/PageLayout/images/clouds.svg'

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
      <div className={styles.container} style={`background: url(${clouds}) bottom / 101% no-repeat, linear-gradient(to top, #41dcd7, #3083b2)`}>
        <Helmet title={t('CatalogsListPage.documentTitle')} />
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
    )
  }
}

export default translate('Catalogs.CatalogsList')(CatalogsListPage)
