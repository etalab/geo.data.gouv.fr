import React, { Component } from 'react'
import { Link } from 'react-router'
import Statistics from '../Statistics/Statistics'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="pusher">
        <div className="ui vertical masthead center aligned segment">

          <div className="ui text container">
            <h1 className="ui inverted header">
              Inspire
            </h1>
            <h2 className="ui inverted header">
              Votre organisation gère des <b>données géographiques</b> avec des outils compatibles Inspire et souhaite les rendre disponibles sans effort sur <a href="http://www.data.gouv.fr/fr/">data.gouv.fr</a>.
            </h2>
            <Link to="catalogs">
              <div className="ui huge teal button">Catalogs List <i className="right arrow icon"></i></div>
            </Link>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row">
              <div className="column">
                <h3>Catalogs</h3>
                <Statistics value={15} label="Catalog" />
              </div>
              <div className="column">
                <h3>"I shouldn't have gone with their competitor."</h3>
                <p>That is what they all say about us</p>
              </div>
              <div className="column">
                <h3>Dataset</h3>
                <Statistics value={76424} label="Catalog" />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Home
