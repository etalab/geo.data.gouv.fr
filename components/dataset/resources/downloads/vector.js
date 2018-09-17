import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import PreviewIcon from 'react-icons/lib/fa/eye'

import formats from '../../../../lib/formats'

import Button from '../../../button'

class Download extends React.Component {
  static propTypes = {
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,

    setPreview: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  render() {
    const {name, available, url, setPreview, t} = this.props

    return (
      <div className={`container ${available ? '' : 'unavailable'}`}>
        <div className='main'>
          <div>
            <span>
              {name}
            </span>
            {formats.map(format => (
              <div key={format.label} className='download'>
                <Button
                  download
                  disabled={!available}
                  size='small'
                  color='white'
                  href={available ? `${url}?format=${format.format}&projection=${format.projection}` : null}
                >
                  {format.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className='action'>
          {available ? (
            <Button block size='small' onClick={setPreview}>
              <PreviewIcon style={{verticalAlign: -2}} /> {t('downloads.openPreview')}
            </Button>
          ) : (
            <i>{t('downloads.unavailable')}</i>
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          .container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.3em;
          }

          .main {
            display: flex;
            align-items: center;
          }

          span {
            display: block;
            margin-bottom: 2px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          .download {
            display: inline-block;
            margin: 0 5px 4px 0;
          }

          .unavailable {
            opacity: .5;
          }

          .action {
            margin-left: auto;

            @media (max-width: 1180px) {
              flex: 1 1 100%;
            }

            i {
              font-size: 0.9em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Download)
