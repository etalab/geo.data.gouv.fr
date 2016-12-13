import React, { Component } from 'react'
import Organizations from '../Organization/Organizations'
import Section from '../Section/Section'
import User from '../User/User'

class Publishing extends Component {
  render() {
    const { user } = this.props

    return (
      <div>
        <User style={{marginBottom: '1em'}} user={user}/>
        <Section title={'Vos organisations'} component={<Organizations organizations={user.organizations} />} />
      </div>
    )
  }
}

export default Publishing
