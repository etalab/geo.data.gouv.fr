import React, { Component } from 'react'
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
    const loader =  <div className="ui active inverted dimmer">
                      <div className="ui large text loader"></div>
                    </div>
    const notMatchingAnymore = this.state.data ? <Statistics value={this.state.data.notMatchingAnymore} label="Waring" color="red" icon="warning sign" /> : loader
    const published = this.state.data ? <Statistics value={this.state.data.published.public + this.state.data.published.private} label="Catalogs" color="green" icon="database"/> : loader
    const notPublishedYet = this.state.data ? <Statistics value={this.state.data.notPublishedYet} label="Work In Progress" color="yellow" icon="hourglass half"/> : loader

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
                  {notMatchingAnymore}
                </div>
              </div>

              <div className="column">
                <div className="ui segment">
                  <h3>Dataset</h3>
                  {published}
                </div>
              </div>

              <div className="column">
                <div className="ui segment">
                  <h3>Awaiting Publication</h3>
                  {notPublishedYet}
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
