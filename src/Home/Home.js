import React, { Component } from 'react'
import { Link } from 'react-router'
import Statistics from '../Statistics/Statistics'
import './Home.css'

class Home extends Component {
  componentDidMount() {
    document.getElementById('header').style.display = "none"
  }

  render() {
    return (
      <div className="ui vertical masthead center aligned segment">

        <div className="ui text container">
          <h1 className="ui inverted header">
            Inspire
          </h1>
          <h2 className="ui inverted header">
            Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
          </h2>
          <Link to="catalogs">
            <div className="ui huge twitter button">Catalogs List <i className="right arrow icon"></i></div>
          </Link>
        </div>

        <div className="ui vertical stripe quote segment container">
          <div className="ui equal width stackable grid">
            <div className="center aligned row">
              <div className="column">
                <div className="ui segment">
                  <h3>Need Attention</h3>
                  <Statistics value={21} label="Waring" color="red" icon="warning sign" />
                </div>
              </div>
              <div className="column">
                <div className="ui segment">
                  <h3>Dataset</h3>
                  <Statistics value={7624} label="Catalogs" color="green" icon="database"/>
                </div>
              </div>
              <div className="column">
                <div className="ui segment">
                  <h3>Awaiting Publication</h3>
                  <Statistics value={42} label="Work In Progress" color="yellow" icon="hourglass half"/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Home
