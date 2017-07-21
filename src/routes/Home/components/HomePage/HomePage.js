import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import SearchInput from 'common/components/SearchInput'
import CatalogPreview from 'common/components/CatalogPreview'

import styles from './HomePage.scss'

class HomePage extends Component {
  componentDidMount() {
    document.title = 'Accueil'
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
    const { catalogs } = this.props

    return (
      <div>
        <div className={styles.masthead}>
          <h1>
            Trouvez facilement les données géographiques dont vous avez besoin
          </h1>
          <SearchInput
            placeholder='Rechercher un jeu de données'
            onSearch={this.search}
            hasButton
          />
          <Link className={styles.datasetLinks} to="/search?availability=yes">Voir tous les jeux de données</Link>
        </div>

        <div className={styles.datagouv}>
          <div className={styles.paper}>
            <h2>Les catalogues moissonnés</h2>
            <div className={styles.catalogs}>
              {catalogs.map(catalog => (
                <div key={catalog._id} className={styles.catalog}>
                  <CatalogPreview catalog={catalog} />
                </div>
              ))}
            </div>
            <Link to="catalogs" className={styles.link}>Voir tous les catalogues</Link>

            <h2 id="evenements">Nos événements</h2>
            <div>
              <Link to="events" className={styles.link}>Voir nos événements</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
