
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

const Link = ({ href, as, ...props }, { i18n: { language } }) => {
  const newAs = as ? `/${language}${as}` : `/${language}${href}`

  return (
    <NextLink href={href} as={newAs} {...props} />
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string
}

Link.contextTypes = {
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

export default Link
