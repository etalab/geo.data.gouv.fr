import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { translate } from 'react-i18next'

import Link from '../link'

class Paging extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    query: PropTypes.shape({
      offset: PropTypes.number,
      limit: PropTypes.number.isRequired
    }),

    router: PropTypes.shape({
      query: PropTypes.object.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  getPageLink = page => {
    const { router } = this.props

    let query = {
      ...router.query
    }

    delete query.p
    if (page > 1) {
      query.p = page
    }

    return format({
      pathname: '/search',
      query
    })
  }

  render() {
    const { count, query: { offset = 0, limit }, t } = this.props

    const page = 1 + Math.ceil(offset / limit)
    const pageCount = Math.ceil(count / limit)

    return (
      <div className='main'>
        {page > 1 ? (
          <Link href={this.getPageLink(page - 1)}>
            <a className='previous'>
              <span>{'< '}</span>{t('paging.previous')}
            </a>
          </Link>
        ) : (
          <div className='disabled'>
            <span>{'< '}</span>{t('paging.previous')}
          </div>
        )}
        <b>
          {page} / {pageCount}
        </b>
        <div>
          {page < pageCount ? (
            <Link href={this.getPageLink(page + 1)}>
              <a className='next'>
                {t('paging.next')}<span>{' >'}</span>
              </a>
            </Link>
          ) : (
            <div className='disabled'>
              {t('paging.next')}<span>{' >'}</span>
            </div>
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          .main {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .disabled {
            color: $lightgrey;
          }

          .previous {
            margin-right: 10px;
          }

          b {
            font-weight: 600;
          }

          .next {
            margin-left: 10px;
          }

          span {
            @media (max-width: 551px) {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('search')(withRouter(Paging))
