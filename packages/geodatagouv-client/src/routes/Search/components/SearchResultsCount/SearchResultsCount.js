import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

const SearchResultsCount = ({ count, t }) => (
  <div>
    {count
      ? t('SearchResultsCount.results', { count })
      : t('SearchResultsCount.noResults')
    }
  </div>
)

SearchResultsCount.propTypes = {
  count: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Search')(SearchResultsCount)
