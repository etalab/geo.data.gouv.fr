import React from 'react'
import PropTypes from 'prop-types'

import OtherProducersItem from './OtherProducersItem'
import { getOrganizations } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import style from './OtherProducers.scss'

class OtherProducers extends React.Component {
  static propTypes = {
    producers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      organizationProducers: []
    }
  }

  componentDidMount() {
    const { producers } = this.props
    const organizationsId = producers.map(producer => producer.associatedTo)
    return waitForDataAndSetState(getOrganizations(organizationsId), this, 'organizations')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { organizations } = this.state
    const { producers } = this.props

    if (!organizations) return null

    return (
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <div>Producteurs rattachés à d'autres organisations</div>
            <div className={style.subtitle}>
              <div>Les producteurs de cette liste ne peuvent pas être rattachés à votre compte organisation parce qu'ils sont déjà rattachés à un autre compte.
                 N\'hésitez pas à contacter l'organisation de rattachement si vous estimez que votre propre compte est plus pertinent.</div>
              <p>En cas de difficulté, contactez <a href='mailto:inspire@data.gouv.fr'>notre équipe</a>.</p>
            </div>
          </div>
          <div>{producers.length}</div>
        </div>
        <div className={style.list}>
          {producers.map((producer, idx) => (
            <div className={style.producers} key={idx}>
              <div>{producer._id}</div>
              <OtherProducersItem organizations={organizations} producer={producer} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default OtherProducers
