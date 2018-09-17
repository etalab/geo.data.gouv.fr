import React from 'react'
import {translate, Trans} from 'react-i18next'
import PropTypes from 'prop-types'

import PlusIcon from 'react-icons/lib/fa/plus-circle'
import MinusIcon from 'react-icons/lib/fa/minus-circle'

import licenses from '../../../lib/licenses'
import {isDistributable} from '../../../lib/distribution'

import Success from '../../success'
import Info from '../../info'
import Warning from '../../warning'

import LicenseCheck from './license-check'
import ProducerCheck from './producer-check'
import ResourcesCheck from './resources-check'

class Datagouv extends React.Component {
  static propTypes = {
    license: PropTypes.string,
    organizations: PropTypes.array.isRequired,
    resources: PropTypes.array.isRequired,

    publication: PropTypes.shape({
      remoteUrl: PropTypes.string.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    license: null,
    publication: null
  }

  state = {
    expanded: false
  }

  toggleDetails = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  getPublishableProperties = () => {
    const {license, organizations, resources} = this.props

    return {
      hasLicense: Object.prototype.hasOwnProperty.call(licenses, license),
      hasOrganizations: organizations && organizations.length > 0,
      isDistributable: isDistributable(resources)
    }
  }

  render() {
    const {publication, license, organizations, resources, t} = this.props
    const {expanded} = this.state

    const {hasLicense, hasOrganizations, isDistributable} = this.getPublishableProperties()

    if (hasLicense && hasOrganizations && isDistributable) {
      if (publication) {
        return (
          <Success>
            <Trans i18nKey='datagouv.published'>
              This dataset <a href={publication.remoteUrl}>is published</a> on data.gouv.fr.
            </Trans>
          </Success>
        )
      }

      return (
        <Info>{t('datagouv.producerActionNeeded')}</Info>
      )
    }

    return (
      <div>
        <Warning>
          {t('datagouv.unpublishable')}
        </Warning>
        <div className='details'>
          {expanded && (
            <div>
              <LicenseCheck isValid={hasLicense} license={license} />
              <ProducerCheck isValid={hasOrganizations} organizations={organizations} />
              <ResourcesCheck isValid={isDistributable} resources={resources} />
            </div>
          )}

          <b onClick={this.toggleDetails}>
            {expanded ? (
              <span>
                <MinusIcon style={{verticalAlign: -2}} /> {t('common:displayLess')}
              </span>
            ) : (
              <span>
                <PlusIcon style={{verticalAlign: -2}} /> {t('datagouv.showDetails')}
              </span>
            )}
          </b>
        </div>

        <style jsx>{`
          .details {
            margin-top: 1em;
          }

          b {
            display: block;
            margin-top: 1em;

            &:hover {
              cursor: pointer;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Datagouv)
