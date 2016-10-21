import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import Counter from '../Statistics/Counter/Counter'
import { fetchGlobalMetrics  } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';
import './Home.css'

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
    const loader =  <CircularProgress size={1.5} />
    const notPublishedYet = this.state.datasets ? <Counter value={this.state.datasets.notPublishedYet} label="" color="yellow" icon="hourglass half"/> : loader
    const published = this.state.datasets ? <Counter value={this.state.datasets.published.public + this.state.datasets.published.private} label="" color="green" icon="database"/> : loader
    const catalogs = this.state.datasets ? <Counter value={106} label="" color="blue" icon="book"/> : loader

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
        padding: '2em',
        margin: '2em',
        marginTop: '0.5em',
      },
    }

    return (
      <div style={styles.masthead}>

        <h2 className="intro">
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
        </h2>

        <div style={styles.stats}>

          <Paper style={styles.paper} zDepth={2}>
            <h3>Published Datasets</h3>
            {published}
          </Paper>

          <Paper style={styles.paper} zDepth={2}>
            <h3>Catalogs</h3>
            {catalogs}
            <Link to="catalogs">
              <RaisedButton label="Consult catalogs" primary={true} />
            </Link>
          </Paper>

          <Paper style={styles.paper} zDepth={2}>
            <h3>Not Yet Published</h3>
            {notPublishedYet}
          </Paper>

        </div>

      </div>
    )
  }
}

export default Home
