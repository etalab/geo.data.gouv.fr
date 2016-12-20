import React, { Component } from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'
import { browserHistory, Link } from 'react-router'
import SearchInput from '../SearchInput/SearchInput'
import HomepageCounter from '../Statistics/HomepageCounter/HomepageCounter'
import { fetchGlobalMetrics  } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import { masthead, buttons, inverted, catalogLinks, datagouv, paper } from './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchGlobalMetrics(), this, 'metrics')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  userSearch(path, textInput) {
    browserHistory.push(`${path}?q=${textInput}`)
  }

  render() {
    const loader =  <CircularProgress />
    const published = this.state.metrics ? <HomepageCounter value={this.state.metrics.published} /> : loader

    return (
      <div>
        <div className={masthead}>
          <SearchInput ref="searchInput" handleTextChange={(textInput) => this.userSearch('datasets', textInput)} />
          <div className={buttons}>
            <button onClick={() => this.userSearch('datasets', this.refs.searchInput.state.textInput)}>Rechercher un jeu de données</button>
            <button className={inverted} onClick={() => this.userSearch('records', this.refs.searchInput.state.textInput)}>Rechercher un enregistrement</button>
          </div>
          <span>OU</span>
          <Link className={catalogLinks} to="catalogs">Explorer les 106 catalogues</Link>
        </div>

        <div className={datagouv}>
          <p>
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>
          </p>

          <div className={paper}>
            <h3>Jeux de données publiés</h3>
            {published}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
