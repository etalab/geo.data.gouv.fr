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
    const notMatchingAnymore = this.state.data ? <Counter value={this.state.data.notMatchingAnymore} label="Warning" color="red" icon="warning sign" /> : loader
    const published = this.state.data ? <Counter value={this.state.data.published.public + this.state.data.published.private} label="Catalogs" color="green" icon="database"/> : loader
    const notPublishedYet = this.state.data ? <Counter value={this.state.data.notPublishedYet} label="Work In Progress" color="yellow" icon="hourglass half"/> : loader

    const styles = {
      header1: {
        tablet: {
          marginTop: '1.5em',
          marginBottom: '0.5em',
          fontSize: '2em',
          fontWeight: 'normal',
        },
        marginTop: '0.5em',
        marginBottom: '0.5em',
        fontSize: '4em',
        fontWeight: 'normal',
      },
      header2: {
        tablet: {
          fontSize: '1.2em',
          fontWeight: 'normal',
          marginTop: '0.5em',
        },
        fontSize: '1.7em',
        fontWeight: 'normal',
      },
      paper: {
        width: 250,
        height: 250,
        padding: 20,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },
    }

    return (
      <div style={styles.masthead} className="ui vertical masthead center aligned segment">

        <div className="ui container">
          <MediaQuery style={styles.header1} minWidth={701} className="ui header" component="h1">
            Inspire
          </MediaQuery>
          <MediaQuery style={styles.header1.tablet} maxWidth={700} className="ui header" component="h1">
            Inspire
          </MediaQuery>

          <MediaQuery style={styles.header2} minWidth={701} className="ui header" component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>
          <MediaQuery style={styles.header2.tablet} maxWidth={700} className="ui header" component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>

          <Link to="catalogs">
            <RaisedButton label="Catalogs" primary={true} />
          </Link>
        </div>

        <Paper style={styles.paper} rounded={true} zDepth={2}>
          <h3>Need Attention</h3>
          {notMatchingAnymore}
        </Paper>

        <Paper style={styles.paper} rounded={true} zDepth={2}>
          <h3>Dataset</h3>
          {published}
        </Paper>

        <Paper style={styles.paper} rounded={true} zDepth={2}>
          <h3>Awaiting Publication</h3>
          {notPublishedYet}
        </Paper>

      </div>
    )
  }
}

export default Home
