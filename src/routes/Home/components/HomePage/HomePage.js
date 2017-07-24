import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { translate } from 'react-i18next'

import SearchInput from 'common/components/SearchInput'
import CatalogPreview from 'common/components/CatalogPreview'

import styles from './HomePage.scss'

class HomePage extends Component {
  componentDidMount() {
    const { t } = this.props
    document.title = t('home')
  }

  search = value => {
    browserHistory.push({
      pathname: '/search',
      query: {
        q: value,
        availability: 'yes'
      }
    })
  }

  render() {
    const { catalogs, t } = this.props

    return (
      <div>
        <div className={styles.masthead}>
          <h1>
            {t('tagline')}
          </h1>
          <SearchInput
            placeholder={t('SearchInput_placeholder')}
            onSearch={this.search}
            hasButton
          />
          <Link className={styles.datasetLinks} to="/search?availability=yes">{t('datasets_link')}</Link>
        </div>

        <div className={styles.datagouv}>
          <div className={styles.paper}>
            <h2>{t('catalogs_section_title')}</h2>
            <div className={styles.catalogs}>
              {catalogs.map(catalog => (
                <div key={catalog._id} className={styles.catalog}>
                  <CatalogPreview catalog={catalog} />
                </div>
              ))}
            </div>
            <Link to="catalogs" className={styles.link}>{t('catalogs_link')}</Link>

            <h2 id="evenements">{t('events_section_title')}</h2>
            <div>
              <Link to="events" className={styles.link}>{t('events_link')}</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('HomePage')(HomePage)
