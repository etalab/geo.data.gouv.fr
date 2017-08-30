import React from 'react'
import PropTypes from 'prop-types'
import { pull } from 'lodash'
import { Link } from 'react-router-dom'

import Errors from '../Errors/Errors'
import RelatedProducers from './RelatedProducers'
import UnrelatedProducers from './UnrelatedProducers'
import OtherProducers from './OtherProducers'

import { getRelated, getUnrelated, getRelatedToOther } from '../../helpers/producers'
import { getOrganizationProducers, dissociateProducer, associateProducer } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import styles from './Producers.scss'

class Producers extends React.Component {
  static propTypes = {
    organization: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      organizationProducers: []
    }
  }

  componentDidMount() {
    return Promise.all([
      this.updateProducersToAssociate()
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateProducersToAssociate() {
    const { organization } = this.props
    return waitForDataAndSetState(getOrganizationProducers(organization._id), this, 'organizationProducers')
  }

  dissociate(producer) {
    const { organizationProducers } = this.state
    const { organization } = this.props

    this.setState({ organizationProducers: pull([...organizationProducers], producer) })

    dissociateProducer(producer._id, organization._id)
      .then(() => this.updateProducersToAssociate())
  }

  associate(producer) {
    const { organizationProducers } = this.state
    const { organization } = this.props

    this.setState({ organizationProducers: pull([...organizationProducers], producer) })

    associateProducer(producer._id, organization._id)
      .then(() => this.updateProducersToAssociate())
  }

  render() {
    const { organizationProducers, errors } = this.state
    const { organization } = this.props
    const related = getRelated(organizationProducers, organization._id)
    const unrelatedProducers = getUnrelated(organizationProducers)
    const relateToOther = getRelatedToOther(organizationProducers, organization._id)

    if (errors.length) return <Errors errors={errors} />
    if (!organizationProducers.length) return null

    return (
      <div>
        <RelatedProducers producers={related} action={(producer) => this.dissociate(producer)} />
        <UnrelatedProducers producers={unrelatedProducers} action={(producer) => this.associate(producer)} />
        <OtherProducers producers={relateToOther} />
        <div className={styles.previousPage}>
          <Link to={`/publication/${organization._id}`}><i className='arrow left icon' /> Retour</Link>
        </div>
      </div>
    )
  }
}

export default Producers
