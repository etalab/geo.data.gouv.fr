import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Organizations from '../../Organizations/Organizations'

class OrganizationsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 'organizations'}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.handleChange}>
        <Tab label="Organizations" value="organizations">
          <Organizations organizations={this.props.metrics.counts.organizations} />
        </Tab>

        <Tab label="Keywords" value="keywords" >
          <Organizations organizations={this.props.metrics.counts.keywords} />
        </Tab>
      </Tabs>
        )
    }
}

export default OrganizationsSection
