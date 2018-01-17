import PropTypes from 'prop-types'

const Links = ({links}) => (
  <ul>
    {links.map((link, idx) => link.href && (
      // eslint-disable-next-line react/no-array-index-key
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
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;

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
    href: PropTypes.string
  })).isRequired
}

export default Links
