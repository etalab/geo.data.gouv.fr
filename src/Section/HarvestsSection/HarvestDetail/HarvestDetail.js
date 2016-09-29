import React, { Component } from 'react'
import Chip from 'material-ui/Chip'
import Subheader from 'material-ui/Subheader'
import moment from 'moment'

class HarvestDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {harvest: undefined}
    this.getLogs()
    this.getCatalog()
  }

  getCatalog() {
    if (!this.state.catalog) {
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.catalogId}`)
      .then((response) => response.json())
      .then((catalog) => {
        this.setState({catalog})
      })
      .catch((err) => {
        console.error(err)
      })
    }
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
    if (this.state.harvest && this.state.catalog) {
      const date = new Date(this.state.harvest.finished).getTime()
      const hoursDifference = moment(date).fromNow();
      const success = this.state.harvest.status === 'successful'
      const styles = {
        paper: {
          padding: '3em',
        },
        header: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap-reverse',
        },
        h1: {
          padding: '0.1em',
        },
        chip: {
          margin: '2em',
        },
        content: {
          padding: '2em',
        },
        li: {
          margin: '1em',
        },
        log: {
          padding: '1em',
          backgroundColor: this.context.muiTheme.palette.accent2Color,
        },
        results: {
          marginLeft: '0.5em',
          fontSize: '1.5em',
        },
      };

      const content = (success) => {
        if (success) {
          return <ul>
                  {this.state.harvest.log.map((log, idx) =>
                    <li key={idx} style={styles.li}>
                      {log.split(':')[0]}: <span style={styles.results}>{log.split(':')[1]}
                    </span></li>)}
                </ul>
        }
        return <div style={styles.log}>
                  {this.state.harvest.log.map((log, idx) => <pre key={idx}><code>{log}</code></pre>)}
                </div>
      }

      return (
        <div style={styles.paper} className="harvest-detail">

          <div style={styles.header} >
            <div>
              <h1 style={styles.h1} className="ui header">{this.state.catalog.name}</h1>
              <Subheader>Harvest ID: {this.state.harvest._id}</Subheader>
            </div>

            <Chip
              style={styles.chip}
              labelColor={this.context.muiTheme.palette.alternateTextColor}
              backgroundColor={success ? this.context.muiTheme.palette.successColor : this.context.muiTheme.palette.failColor}
              >
              {this.state.harvest.status} {hoursDifference}
            </Chip>
          </div>

          <div style={styles.content}>
            <div className="ui header">{success ? 'Results' : 'Logs'}</div>
            <div className="ui divider"></div>
            {content(success)}
          </div>

        </div>
    )} else {
      return <div></div>
    }
  }
}

HarvestDetail.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}
export default HarvestDetail
