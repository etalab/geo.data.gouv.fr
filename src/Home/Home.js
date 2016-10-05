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
    const published = this.state.data ? <Counter value={this.state.data.published.public + this.state.data.published.private} label="Catalogs" color="green" icon="database"/> : loader

    const styles = {
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
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2em',
        margin: '2em',
      },
    }

    return (
      <div style={styles.masthead} className="ui vertical masthead center aligned segment">

        <div className="ui container">

          <MediaQuery style={styles.header2} minWidth={701} className="ui header" component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>
          <MediaQuery style={styles.header2.tablet} maxWidth={700} className="ui header" component="h2">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </MediaQuery>

        </div>

        <Paper style={styles.paper} rounded={true} zDepth={2}>
          <h3>Catalogs</h3>
          {published}
          <Link to="catalogs">
            <RaisedButton label="Consult catalogs" primary={true} />
          </Link>
        </Paper>

      </div>
    )
  }
}

export default Home
