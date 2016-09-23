import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router'
import Statistics from '../Statistics/Statistics'
import './Home.css'

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
    const notMatchingAnymore = this.state.data ? <Statistics value={this.state.data.notMatchingAnymore} label="Warning" color="red" icon="warning sign" /> : loader
    const published = this.state.data ? <Statistics value={this.state.data.published.public + this.state.data.published.private} label="Catalogs" color="green" icon="database"/> : loader
    const notPublishedYet = this.state.data ? <Statistics value={this.state.data.notPublishedYet} label="Work In Progress" color="yellow" icon="hourglass half"/> : loader

    const style = {
      width: 250,
      height: 250,
      padding: 20,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div className="ui vertical masthead center aligned segment">

        <div className="ui container">
          <h1 className="ui header">
            Inspire
          </h1>
          <h2 className="ui header">
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </h2>
          <Link to="catalogs">
            <RaisedButton label="Catalogs" primary={true}  icon={<FontIcon className="muidocs-icon-custom-github" />} />
          </Link>
        </div>

        <Paper style={style} rounded={true} zDepth={1}>
          <h3>Need Attention</h3>
          {notMatchingAnymore}
        </Paper>

        <Paper style={style} rounded={true} zDepth={1}>
          <h3>Dataset</h3>
          {published}
        </Paper>

        <Paper style={style} rounded={true} zDepth={1}>
          <h3>Awaiting Publication</h3>
          {notPublishedYet}
        </Paper>


      </div>
    )
  }
}

export default Home
