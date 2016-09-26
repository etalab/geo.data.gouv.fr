import React, { Component } from 'react'

class HarvestDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {harvest: undefined}
    this.getLogs()
  }

  getLogs() {
    if (!this.state.harvest) {
      return fetch(`https://inspire.data.gouv.fr/api/geogw/services/${this.props.params.catalogId}/synchronizations/${this.props.params.harvestId}`)
        .then((response) => response.json())
        .then((harvest) => {
          this.setState({harvest})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  render() {
    if (this.state.harvest) {
      return (
        <div className="harvest-detail">
          <div className="ui padded vertical segment">
            <div className="ui header">Logs</div>
            <div className="ui divider"></div>
            {this.state.harvest.log.map((log, idx) => <pre key={idx}><code>{log}</code></pre>)}
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestDetail
