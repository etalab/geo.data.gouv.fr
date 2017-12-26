import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import SuccessIcon from 'react-icons/lib/fa/check'
import FailIcon from 'react-icons/lib/fa/close'

import Link from '../link'

const Header = ({catalog, status, t}) => (
  <div>
    <h1>
      {catalog.name}
      {status === 'successful' ? (
        <span className='successful'>
          <SuccessIcon style={{verticalAlign: -2}} /> {t('harvest.status.successful')}
        </span>
      ) : (
        <span className='failed'>
          <FailIcon style={{verticalAlign: -2}} /> {t('harvest.status.failed')}
        </span>
      )}
    </h1>

    <Link href={`/catalog?cid=${catalog._id}`} as={`/catalogs/${catalog._id}`} prefetch>
      <a>
        {t('harvest.header.backToCatalog')}
      </a>
    </Link>

    <style jsx>{`
      @import 'colors';

      div {
        display: flex;
        justify-content: space-between;
        margin: 0.2em 0 1em;

        @media (max-width: 960px) {
          flex-direction: column;
        }
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 1em;
      }

      span {
        font-size: 1.1rem;
        line-height: 1;
        display: inline-block;
        vertical-align: 1px;
        margin-left: 10px;
        padding: 4px 8px 4px 5px;
        border-radius: 3px;

        @media (max-width: 551px) {
          display: block;
          width: auto;
          margin: 10px 0 0;
        }
      }

      .successful {
        color: $green;
        background: $green;
        color: $white;
      }

      .failed {
        color: $red;
        background: $red;
        color: $white;
      }
    `}</style>
  </div>
)

Header.propTypes = {
  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,

  status: PropTypes.oneOf([
    'successful',
    'failed'
  ]).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Header)
