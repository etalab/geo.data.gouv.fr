import React from 'react'

const Organizations = ({label, organizations}) => {
  const styles = {
    list: {
      paddingTop: "2em",
      paddingBottom: "2em",
    },
  }
  return (
    <div className="ui segments">
      <div className="ui secondary segment">
        <h4 className="header">{label}</h4>
      </div>
      <div style={styles.list} className="ui grid container">
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
