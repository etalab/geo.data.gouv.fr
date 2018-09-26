import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import DownloadIcon from 'react-icons/lib/fa/arrow-circle-o-down'

import Button from '../../../button'

class SimpleDownload extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  }

  render() {
    const {name, url, t} = this.props

    return (
      <div className='container'>
        <div className='main'>
          <div>
            <span>
              {name}
            </span>
          </div>
        </div>
        <div className='action'>
          <Button block href={url} download={name} size='small'>
            <DownloadIcon style={{verticalAlign: -2}} /> {t('downloads.download')}
          </Button>
        </div>

        <style jsx>{`
          @import 'fonts';
          @import 'colors';

          .container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.2em;
          }

          .main {
            display: flex;
            align-items: center;
          }

          span {
            display: block;
            font-weight: $font-weight-bold;
            margin-bottom: 2px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          .download {
            display: inline-block;
            margin: 0 5px 0 0;
          }

          .unavailable {
            opacity: .5;

            :global(svg) {
              color: $red;
            }

            i {
              display: block;
              margin-bottom: 5px;
            }
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

export default translate('dataset')(SimpleDownload)
