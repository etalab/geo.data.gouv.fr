import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { translate } from 'react-i18next'

const Link = ({ i18n: { language }, href, as, t, ...props }) => {
  const newAs = as ? `/${language}${as}` : `/${language}${href}`

  return (
    <NextLink href={href} as={newAs} {...props} />
  )
}

Link.propTypes = {
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired,

  href: PropTypes.string.isRequired,
  as: PropTypes.string
}

export default translate()(Link)
