import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Harvest from './Harvest/Harvest'
import LineChart from '../../Charts/LineChart/LineChart'

class HarvestsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {harvests: undefined}
    this.getHarvests()
  }

  getHarvests() {
    if (!this.state.harvests) {
      return fetch(`https://inspire.data.gouv.fr/api/geogw/services/${this.props.catalog.id}/synchronizations`)
        .then((response) => response.json())
        .then((harvests) => {
          this.setState({harvests})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  getGraphData() {
    const reorderedHarvests = [...this.state.harvests].reverse()
    const data = []
    for (let harvest of reorderedHarvests) {
      if (harvest.status === "successful") {
        const date = new Date(harvest.finished).toLocaleDateString().split('-').reverse().join('/')
        data[date] = harvest.itemsFound
      }
    }
    return data
  }

  render() {
    if (this.state.harvests) {
      const dataGraph = this.getGraphData()
      return (
        <div className="ui stackable grid">

          <div className="eight wide column">
            <Table>

              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                  <TableHeaderColumn>Records</TableHeaderColumn>
                  <TableHeaderColumn>Finished</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                  displayRowCheckbox={true}
                  deselectOnClickaway={true}
                  showRowHover={true}
                  stripedRows={true}
                >
                {this.state.harvests.map((harvest, idx) => <Harvest key={idx} harvest={harvest} catalog={this.props.catalog} />)}
              </TableBody>

            </Table>
          </div>

          <div className="eight wide column">
            <LineChart data={dataGraph} />
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
