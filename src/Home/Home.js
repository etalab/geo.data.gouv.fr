import React, { Component } from 'react'
import { Link } from 'react-router'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="pusher">
        <div className="ui vertical masthead center aligned segment">

          <div className="ui text container">
            <h1 className="ui header">
              Home
            </h1>
            <Link to={`/catalogs`}>
              <div className="ui huge primary button">Catalogs List <i className="right arrow icon"></i></div>
            </Link>
          </div>

        </div>

      </div>
    )
  }
}

export default Home
