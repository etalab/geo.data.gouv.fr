import React, { Component } from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'
import { browserHistory, Link } from 'react-router'
import SearchInput from '../SearchInput/SearchInput'
import Counter from '../Statistics/Counter/Counter'
import { theme  } from '../../tools'
import { fetchGlobalMetrics  } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import { masthead, datasetsButton, recordsButton, catalogLinks, datagouv, datagouvIntro, datagouvLink, stats, paper } from './Home.css'

const datagouvCounter = {
  value: {
    fontSize: '3em',
  },
}

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
    const published = this.state.metrics ? <Counter value={this.state.metrics.published} style={datagouvCounter} size="large" color={theme.green} icon="database"/> : loader

    return (
      <div>
        <div className={masthead}>
          <SearchInput ref="searchInput" handleTextChange={(textInput) => this.userSearch('datasets', textInput)} />
          <div>
            <button className={datasetsButton} onClick={() => this.userSearch('datasets', this.refs.searchInput.state.textInput)}>Rechercher un jeu de données</button>
            <button className={recordsButton} onClick={() => this.userSearch('records', this.refs.searchInput.state.textInput)}>Rechercher un enregistrement</button>
          </div>
          <span style={{lineHeight: '4em'}}>OU</span>
          <Link className={catalogLinks} to="catalogs">Explorer les 106 catalogues</Link>
        </div>

        <div className={datagouv}>
          <p className={datagouvIntro}>
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a className={datagouvLink} href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>
          </p>

          <div className={stats}>
            <div className={paper}>
              <h3>Jeux de données publiés</h3>
              {published}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
