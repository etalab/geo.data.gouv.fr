import React, { Component } from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'
import { Link } from 'react-router'
import SearchInput from '../SearchInput/SearchInput'
import Counter from '../Statistics/Counter/Counter'
import { theme  } from '../../tools';
import { fetchGlobalMetrics  } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';

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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    color: theme.white,
  },
  catalogLinks: {
    fontSize: '1.5em',
  },
  datagouv: {
    borderTop: `1px solid ${theme.darkblue}`,
    backgroundColor: theme.blue,
    color: '#FFF',
    width: '100%',
    padding: 40,
    marginTop: '4em',
  },
  datagouvIntro: {
    fontSize: '1.2em',
    fontWeight: 'lighter',
    textAlign: 'center',
    fontVariant: 'small-caps',
  },
  datagouvLink: {
    color: '#FFF',
    fontWeight: 'bolder',
    fontSize: '1.3em',
    fontVariant: 'normal',
  },
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchGlobalMetrics(), this, 'datasets');
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const loader =  <CircularProgress />
    const notPublishedYet = this.state.datasets ? <Counter value={this.state.datasets.notPublishedYet} label="" color="yellow" icon="hourglass half"/> : loader
    const published = this.state.datasets ? <Counter value={this.state.datasets.published.public + this.state.datasets.published.private} label="" color="green" icon="database"/> : loader

    return (
      <div>
        <div style={styles.masthead}>
          <SearchInput />
          <span style={{lineHeight: '4em'}}>OR</span>
          <Link style={styles.catalogLinks} to="catalogs">Explore the 106 catalogs</Link>
        </div>

        <div style={styles.datagouv}>
          <p style={styles.datagouvIntro}>
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a style={styles.datagouvLink} href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>
          </p>

          <div style={styles.stats}>
            <div style={styles.paper}>
              <h3>Not Yet Published</h3>
              {notPublishedYet}
            </div>
            <div style={styles.paper}>
              <h3>Published Datasets</h3>
              {published}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
