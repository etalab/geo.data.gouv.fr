import React, { Component } from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'
import { browserHistory, Link } from 'react-router'
import SearchInput from '../SearchInput/SearchInput'
import Counter from '../Statistics/Counter/Counter'
import { theme  } from '../../tools'
import { fetchGlobalMetrics  } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

const styles = {
  masthead: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '8%',
  },
  stats: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  recordsButton: {
    margin: '40px 20px 10px 20px',
    padding: '15px 20px',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: theme.blue,
  },
  datasetsButton: {
    margin: '40px 20px 10px 20px',
    padding: '15px 20px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
  },
  catalogLinks: {
    fontSize: '1.5em',
  },
  datagouv: {
    backgroundColor: '#FFF',
    border: `1px solid ${theme.blue}`,
    color: theme.blue,
    padding: 40,
    margin: '0 8% 4em',
  },
  datagouvIntro: {
    fontSize: '1.2em',
    fontWeight: 'lighter',
    textAlign: 'center',
    fontVariant: 'small-caps',
  },
  datagouvLink: {
    fontWeight: 'bolder',
    fontSize: '1.3em',
    fontVariant: 'normal',
  },
  datagouvCounter: {
    value: {
      fontSize: '3em',
    },
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
    const published = this.state.metrics ? <Counter value={this.state.metrics.published} style={styles.datagouvCounter} size="large" color={theme.green} icon="database"/> : loader

    return (
      <div>
        <div style={styles.masthead}>
          <SearchInput ref="searchInput" handleTextChange={(textInput) => this.userSearch('datasets', textInput)} />
          <div>
            <button style={styles.datasetsButton} onClick={() => this.userSearch('datasets', this.refs.searchInput.state.textInput)}>Rechercher un jeu de données</button>
            <button style={styles.recordsButton} onClick={() => this.userSearch('records', this.refs.searchInput.state.textInput)}>Rechercher un enregistrement</button>
          </div>
          <span style={{lineHeight: '4em'}}>OU</span>
          <Link style={styles.catalogLinks} to="catalogs">Explorer les 106 catalogues</Link>
        </div>

        <div style={styles.datagouv}>
          <p style={styles.datagouvIntro}>
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a style={styles.datagouvLink} href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>
          </p>

          <div style={styles.stats}>
            <div style={styles.paper}>
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
