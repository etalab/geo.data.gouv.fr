import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import LinkIcon from 'react-icons/lib/fa/external-link'

import Button from '../../../button'

class PageResource extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      href: PropTypes.string.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  render() {
    const {resource, t} = this.props

    return (
      <div className='container'>
        <div className='header'>
          <h5>{resource.name || resource.href}</h5>
          <p>{resource.description && resource.description}</p>
        </div>

        <div className='action'>
          <Button block href={resource.href} target='_blank' size='small'>
            <LinkIcon style={{verticalAlign: -2}} /> {t('downloads.browse')}
          </Button>
        </div>

        <style jsx>{`
          @import 'colors';

          .container {
            display: flex;
            flex-wrap: wrap;
          }

          .header {
            margin-bottom: 0.3em;
          }

          h5 {
            margin-bottom: 0;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          p {
            margin-bottom: 0;
            font-size: 0.9em;
            font-style: italic;
            color: $grey;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          .action {
            margin-left: auto;

            @media (max-width: 1180px) {
              flex: 1 1 100%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(PageResource)
