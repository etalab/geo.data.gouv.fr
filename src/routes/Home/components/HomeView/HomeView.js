import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import SearchInput from '../../../../components/SearchInput/SearchInput'
import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'

import styles from './HomeView.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Accueil'
  }

  userSearch(textInput) {
    browserHistory.push({ pathname: '/search', query: {q: textInput, availability: 'yes'} })
  }

  render() {
    const { catalogs } = this.props

    return (
      <div>
        <div className={styles.masthead}>
          <h1>
            Trouvez facilement les données géographiques dont vous avez besoin
          </h1>
          <SearchInput placeholder={'Rechercher un jeu de donnée'} onSearch={(textInput) => this.userSearch(textInput)} searchButton={true} />
          <Link className={styles.datasetLinks} to="/search?availability=yes">Voir tous les jeux de données</Link>
        </div>

        <div className={styles.datagouv}>
          <div className={styles.paper}>
            <h2>Les catalogues moissonnés</h2>
            <div className={styles.catalogs}>
              { catalogs.map((catalog, idx) => (
                <CatalogPreview key={idx} catalog={catalog} />
              ))}
            </div>
            <Link className={styles.catalogLinks} to="catalogs">Voir tous les catalogues</Link>

            <h2 id="evenements">Nos événements</h2>
            <div className={styles.events}>
              <Link to="events">Voir nos événements</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
