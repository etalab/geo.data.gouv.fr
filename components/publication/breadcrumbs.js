import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import Link from '../link'

const PAGE_NAMES = {
  datasets: 'Jeux de données',
  producers: 'Producteurs'
}

const Breadcrumbs = ({organization, page}) => (
  <div>
    {organization ? (
      <Fragment>
        <span>
          <Link href='/publication'>
            <a>
              Mes organisations
            </a>
          </Link>
        </span>

        {page ? (
          <Fragment>
            <span>
              <Link href={`/publication/organization?oid=${organization.id}`} as={`/publication/${organization.id}`}>
                <a>
                  {organization.name}
                </a>
              </Link>
            </span>
            <span>
              {PAGE_NAMES[page]}
            </span>
          </Fragment>
        ) : (
          <span>
            {organization.name}
          </span>
        )}
      </Fragment>
    ) : (
      <span>Mes organisations</span>
    )}

    <style jsx>{`
      @import 'colors';

      div {
        font-size: 1.3rem;
        margin: 1.8rem 0 2.2rem;
      }

      span:not(:last-child) {
        &:after {
          content: '/';
          margin: 0 0.4rem;
          color: darken($lightgrey, 5%);
        }
      }
    `}</style>
  </div>
)

Breadcrumbs.propTypes = {
  organization: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  page: PropTypes.oneOf([
    'datasets',
    'producers'
  ])
}

Breadcrumbs.defaultProps = {
  organization: null,
  page: null
}

export default Breadcrumbs
