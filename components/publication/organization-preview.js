import React from 'react'
import PropTypes from 'prop-types'

import Link from '../link'

const OrganizationPreview = ({ organization }) => (
  <Link href={`/publication/organization?oid=${organization.id}`} as={`/publication/${organization.id}`} prefetch>
    <a>
      <div className='image'>
        <img src={organization.logo || '/static/images/no-img.png'} alt={organization.slug} />
      </div>
      <div className='name'>
        <div>{organization.name}</div>
      </div>

      <style jsx>{`
        @import 'colors';

        a {
          display: block;
          border-radius: 2px;
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          text-align: center;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;

          &:hover {
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
          }
        }

        .image {
          padding: 1em;
          height: 130px;
          flex: 1;

          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          display: flex;
        }

        img {
          max-width: 100%;
          max-height: 100%;
        }

        .name {
          color: $white;
          background-color: $blue;
          padding: 1em;
        }
      `}</style>
    </a>
  </Link>
)

OrganizationPreview.propTypes = {
  organization: PropTypes.shape({
    id: PropTypes.string.isRequired,
    logo: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default OrganizationPreview
