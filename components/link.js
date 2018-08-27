
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import {translate} from 'react-i18next'

const Link = ({
  href,
  as,
  i18n: {language},

  tReady, // Destructured so that it’s not included in ...props
  t, // Destructured so that it’s not included in ...props

  ...props
}) => {
  const newAs = as ? `/${language}${as}` : `/${language}${href}`

  return (
    <NextLink href={href} as={newAs} {...props} />
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

Link.defaultProps = {
  as: null
}

export default translate()(Link)
