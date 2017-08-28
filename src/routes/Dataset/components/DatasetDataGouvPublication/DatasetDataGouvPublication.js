import React from 'react'
import { translate, Trans } from 'react-i18next'
import PropTypes from 'prop-types'

import { Button } from 'common/components/Buttons'

import { checkLicense, checkProducers, checkDataAvailability } from 'common/helpers/dataGouvChecks'

import { CheckLicense, CheckProducers, CheckDataAvailability } from '../DatasetChecks'

import styles from './DatasetDataGouvPublication.scss'

class DatasetDataGouvPublication extends React.PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      metadata: PropTypes.shape({
        license: PropTypes.string
      }).isRequired,

      organizations: PropTypes.array.isRequired,

      dataset: PropTypes.shape({
        distributions: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,

    publication: PropTypes.shape({
      remoteUrl: PropTypes.string.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  state = {
    expanded: false
  }

  toggleDetails = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render () {
    const { dataset, publication, t } = this.props
    const { expanded } = this.state

    const licenseCheck = checkLicense(dataset.metadata.license)
    const producersCheck = checkProducers(dataset.organizations)
    const dataAvailabilityCheck = checkDataAvailability(dataset.dataset.distributions)

    if (licenseCheck && producersCheck && dataAvailabilityCheck) {
      if (publication) {
        return (
          <div>
            <a href={publication.remoteUrl}>{t('components.DatasetDataGouvPublication.dvgLink')}</a>
          </div>
        )
      } else {
        return (
          <div>
            <Trans i18nKey='components.DatasetDataGouvPublication.canBePublished'>
              This dataset <b>can</b> be published on data.gouv.fr
            </Trans>
            <div className={styles.highlight}>{t('components.DatasetDataGouvPublication.producerActionNeeded')}</div>
          </div>
        )
      }
    } else {
      return (
        <div className={styles.checklist}>
          <Trans i18nKey='components.DatasetDataGouvPublication.cantBePublished'>
            This dataset <b>can not</b> be published on data.gouv.fr
          </Trans>
          {expanded && (
            <div>
              <CheckLicense license={dataset.metadata.license} valid={licenseCheck} />
              <CheckProducers organizations={dataset.organizations} valid={producersCheck} />
              <CheckDataAvailability distributions={dataset.dataset.distributions} valid={dataAvailabilityCheck} />
            </div>
          )}
          <Button text={expanded ? t('components.DatasetDataGouvPublication.hide') : t('components.DatasetDataGouvPublication.show')} action={this.toggleDetails} />
        </div>
      )
    }
  }
}

export default translate('Dataset')(DatasetDataGouvPublication)
