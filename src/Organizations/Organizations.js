import React from 'react'
import './Organizations.css'

const Organizations = ({label, organizations}) => {
  return (
    <div className="ui segments">
      <div className="ui secondary segment">
        <div className="header">{label}</div>
      </div>
      <div className="ui grid container">
        {Object.keys(organizations).map( key =>
          <div key={key} className="two column row">
            <div className="column header">{key}</div>
            <div className="float right aligned column">
              <div className="ui blue circular label">{organizations[key]}</div>
            </div>
          </div>
      )}
      </div>
    </div>
  )
}

export default Organizations
