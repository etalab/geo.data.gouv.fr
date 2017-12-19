import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Section from './section'
import CatalogsList from './catalogs-list'

const Catalogs = ({catalogsPromise, t}) => (
  <Section title={t('catalogsSectionTitle')}>
    <CatalogsList promise={catalogsPromise} />
  </Section>
)

Catalogs.propTypes = {
  catalogsPromise: PropTypes.instanceOf(Promise),
  t: PropTypes.func.isRequired
}

Catalogs.defaultProps = {
  catalogsPromise: null
}

export default translate('home')(Catalogs)
