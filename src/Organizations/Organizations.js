import React from 'react'

const Organizations = ({label, organizations}) => {
  return (
    <div className="ui segments">
      <div className="ui secondary segment">
        <div className="header">{label}</div>
      </div>
      {Object.keys(organizations).map( key =>
        <div key={key} className="ui clearing segment">
          <div className="header">{key}</div>
          <span className="ui right floated blue circular label">{organizations[key]}</span>
        </div>
      )}
      </div>
  )
}

export default Organizations
