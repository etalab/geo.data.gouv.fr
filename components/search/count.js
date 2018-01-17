import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

const Count = ({count, t}) => (
  <div>
    {count ? t('count.results', {
      count
    }) : t('count.noResults')}

    <style jsx>{`
      div {
        margin: 2em 0 1em;
      }
    `}</style>
  </div>
)

Count.propTypes = {
  count: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('search')(Count)
