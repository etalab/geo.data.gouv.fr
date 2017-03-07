import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import CatalogPreviewList from '../CatalogPreview/CatalogPreviewList'

import EventbriteWidget from '../Event/EventbriteWidget'
import SearchInput from '../SearchInput/SearchInput'

import { fetchCatalogs } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import { masthead, datasetLinks, catalogLinks, datagouv, events, paper, catalogsList } from './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Accueil'
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  userSearch(textInput) {
    browserHistory.push({ pathname: '/search', query: {q: textInput, availability: 'yes'} })
  }

  render() {
    const { catalogs } = this.state

    return (
      <div>
        <div className={masthead}>
          <h1>
            Trouvez facilement les données géographiques dont vous avez besoin
          </h1>
          <SearchInput placeholder={'Rechercher un jeu de donnée'} onSearch={(textInput) => this.userSearch(textInput)} searchButton={true} />
          <Link className={datasetLinks} to="/search?availability=yes">Voir tous les jeux de données</Link>
        </div>

        <div className={datagouv}>
          <div className={paper}>
            <h2>Les catalogues moissonnés</h2>
            <div className={catalogsList}>
              <CatalogPreviewList catalogs={catalogs} limit={3} />
            </div>

            {catalogs ?
              <Link className={catalogLinks} to="catalogs">Voir les <b>{catalogs.length}</b> catalogues</Link> :
              <Link className={catalogLinks} to="catalogs">Voir tous les catalogues</Link>
            }

            <h2 id="evenements">Événements à venir</h2>
            <div className={events}>
              <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=31508534876"/>
              <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32256259340"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
