import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import Counter from '../Statistics/Counter/Counter'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {data: undefined}
    this.getData()
  }

  getData() {
    if (!this.state.data) {
      return fetch(`https://inspire.data.gouv.fr/api/datasets/metrics`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({data})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  render() {
    const loader =  <CircularProgress size={1.5} />
    const notPublishedYet = this.state.data ? <Counter value={this.state.data.notPublishedYet} label="" color="yellow" icon="hourglass half"/> : loader
    const published = this.state.data ? <Counter value={this.state.data.published.public + this.state.data.published.private} label="" color="green" icon="database"/> : loader
    const catalogs = this.state.data ? <Counter value={106} label="" color="blue" icon="book"/> : loader

    const styles = {
      masthead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '1em',
        paddingBottom: '1em',
      },
      header: {
        tablet: {
          fontSize: '1em',
          fontWeight: 'normal',
          marginTop: '0.5em',
          textAlign: 'center',
          padding: '1em',
        },
        fontSize: '1.2em',
        fontWeight: 'normal',
        textAlign: 'center',
        padding: '1em',
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

        <div style={styles.header}>

          <MediaQuery style={styles.header} minWidth={701} component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>
          <MediaQuery style={styles.header.tablet} maxWidth={700} component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>

        </div>

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
