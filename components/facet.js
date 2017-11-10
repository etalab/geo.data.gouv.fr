import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'next/router'

class Facet extends React.Component {
  static propTypes = {
    facet: PropTypes.shape({
      name: PropTypes.oneOf([
        'availability',
        'dgvPublication',
        'distributionFormat',
        'keyword',
        'metadataType',
        'opendata',
        'organization',
        'representationType',
        'type',
        'catalog'
      ]).isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,

    count: PropTypes.number,
    detailed: PropTypes.bool,
    removable: PropTypes.bool,
    onClick: PropTypes.func,

    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired
    }).isRequired,

    i18n: PropTypes.shape({
      exists: PropTypes.func.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    detailed: false,
    removable: false
  }

  add = filter => {
    const { router, i18n: { language } } = this.props

    let query
    if (router.pathname === '/search') {
      query = {
        ...router.query
      }

      const match = query[filter.name]
      if (Array.isArray(match)) {
        query[filter.name].push(filter.value)
      } else if (match) {
        query[filter.name] = [match, filter.value]
      } else {
        query[filter.name] = filter.value
      }
    } else {
      query = {
        [filter.name]: filter.value
      }
    }

    const url = format({
      pathname: '/search',
      query
    })

    router.push(url, `/${language}${url}`)
  }

  remove = filter => {
    const { router, i18n: { language } } = this.props

    const query = {
      ...router.query
    }

    const match = query[filter.name]
    if (Array.isArray(match)) {
      query[filter.name] = match.filter(v => v !== filter.value)
    } else {
      delete query[filter.name]
    }

    const url = format({
      pathname: '/search',
      query
    })

    router.push(url, `/${language}${url}`)
  }

  onClick = e => {
    const { remove, facet, onClick } = this.props

    e.preventDefault()

    if (remove) {
      this.remove(facet)
    } else {
      this.add(facet)
    }

    if (onClick) {
      onClick(facet)
    }
  }

  render() {
    const { facet, count, detailed, removable, t, i18n } = this.props

    const title = t(`facets.types.${facet.name}`)
    const value = i18n.exists(`facets.values.${facet.value}`) ? t(`facets.values.${facet.value}`) : facet.value

    return (
      <div className='container'>
        <div className={`facet ${removable && 'removable'}`} onClick={this.onClick}>
          {detailed && <div className='title'>{title}</div>}
          <div className='value'>{value}</div>
        </div>
        {count && <div className='number'>&times; {count}</div>}

        <style jsx>{`
          @import 'colors';

          .container {
            display: flex;
          }

          .facet {
            display: flex;
            flex: 1;
            background: $lightgrey;
            border-radius: 3px 0 0 3px;
            height: 26px;
            line-height: 26px;
            padding: 0 15px 0 23px;
            position: relative;
            text-decoration: none;
            color: $black;
            cursor: pointer;

            &:before {
              background: $white;
              border-radius: 10px;
              box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
              position: absolute;
              content: '';
              height: 6px;
              left: 10px;
              width: 6px;
              top: 10px;
            }

            &:after {
              background: $white;
              border-bottom: 13px solid transparent;
              border-left: 10px solid $lightgrey;
              border-top: 13px solid transparent;
              content: '';
              position: absolute;
              right: 0;
              top: 0;
            }

            &:hover {
              background-color: $blue;
              color: $white;

              &:after {
                border-left-color: $blue;
              }

              &.removable {
                background-color: $red;

                &:after {
                  border-left-color: $red;
                }
              }
            }
          }

          .title {
            line-height: 26px;
            height: 26px;
            margin-right: 7px;
            padding-right: 8px;
            border-right: 1px solid rgba(255, 255, 255, 0.7);
            font-variant: small-caps;
          }

          .value {
            max-width: 215px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:first-letter {
              text-transform: capitalize;
            }

            @media (max-width: 960px) {
              max-width: 255px;
            }

            @media (max-width: 551px) {
              max-width: 145px;
            }
          }

          .title + .value {
            max-width: 380px;

            @media (max-width: 960px) {
              max-width: 280px;
            }

            @media (max-width: 768px) {
              max-width: 180px;
            }

            @media (max-width: 551px) {
              max-width: 120px;
            }
          }

          .number {
            line-height: 26px;
            height: 26px;
            margin-left: 4px;
            font-size: 0.9em;

            @media (max-width: 551px) {
              margin-left: 2px;
              font-size: 0.8em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(withRouter(Facet))
