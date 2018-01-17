import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './check'

const DistributionCheck = ({distributions, isValid, t}) => (
  <Check title={t('datagouv.checks.distribution.title')} isValid={isValid}>
    {isValid ? (
      <div>
        {t('datagouv.checks.distribution.available')}
        <ul>
          {distributions.map(distribution => distribution.available ? (
            <li key={distribution._id}>
              {distribution.typeName || distribution.layer || distribution.name}
            </li>
          ) : null)}
        </ul>
      </div>
    ) : t('datagouv.checks.distribution.unavailable')}

    <style jsx>{`
      ul {
        margin-top: 0.4em;
        margin-bottom: 0;
        padding-left: 0.8em;
      }

      li {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
  </Check>
)

DistributionCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  distributions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    available: PropTypes.bool,
    typeName: PropTypes.string,
    layer: PropTypes.string,
    name: PropTypes.string
  })).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(DistributionCheck)
