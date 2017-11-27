import React from 'react'
import PropTypes from 'prop-types'

const Links = ({ links }) => (
  <ul>
    {links.map((link, idx) => (
      <li key={idx}>
        <a href={link.href}>{link.name || link.href}</a>
      </li>
    ))}

    <style jsx>{`
      ul {
        margin: 0;
        padding: 0 0 0 1.2em;
      }

      li {
        margin-bottom: 2px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    `}</style>
  </ul>
)

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string.isRequired
  })).isRequired
}

export default Links
