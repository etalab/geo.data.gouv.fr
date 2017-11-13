import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Loader = ({ t }) => (
  <div style={{ textAlign: 'center', paddingTop: 20 }}>
    {t('loading')}
  </div>
)

Loader.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(Loader)
