import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import {translate} from 'react-i18next'

import MapIcon from 'react-icons/lib/fa/map'
import TableIcon from 'react-icons/lib/fa/table'

import {_get} from '../../../lib/fetch'

import Modal from '../../modal'
import Button from '../../button'
import ErrorWrapper from '../../error-wrapper'
import CenteredMap from '../../centered-map'
import Loader from '../../centered-map/loader'

const PreviewTable = dynamic(import('./preview-table' /* webpackChunkName: "preview-table" */), {
  ssr: false,
  loading: translate()(({t}) => t('loading'))
})

class Preview extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    embedLink: PropTypes.string.isRequired,
    extent: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    extent: null
  }

  state = {
    loading: true,
    data: null,
    view: 'map'
  }

  async componentDidMount() {
    const {link} = this.props

    try {
      const data = await _get(`${link}?format=GeoJSON&projection=WGS84`)

      this.setState({
        loading: false,
        data
      })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }

  changeView = view => () => {
    this.setState(() => ({
      view
    }))
  }

  render() {
    const {title, embedLink, extent, onClose, t} = this.props
    const {loading, data, view, error} = this.state

    return (
      <Modal fluid fullHeight title={title} onClose={onClose}>
        <div className='container'>
          {loading ? (
            <Loader>
              {t('common:loading')}
            </Loader>
          ) : (
            <div className='preview'>
              <div className='actions'>
                <Button
                  size='large'
                  color={view === 'map' ? 'blue' : 'white'}
                  onClick={this.changeView('map')}
                >
                  <MapIcon />
                </Button>
                <Button
                  size='large'
                  color={view === 'table' ? 'blue' : 'white'}
                  onClick={this.changeView('table')}
                >
                  <TableIcon />
                </Button>
              </div>

              {error ? <span className='error'>{t('preview.errors.download')}</span> : (
                <div className='map-wrapper'>
                  {view === 'map' ? (
                    <div className='map'>
                      <div className='map-container'>
                        <div className='map-inner'>
                          <ErrorWrapper message={t('common:errors.map')}>
                            <CenteredMap data={data} extent={extent} />
                          </ErrorWrapper>
                        </div>
                      </div>

                      <div className='embed'>
                        {t('preview.embed')}
                        <div>
                          <textarea
                            readOnly
                            rows={2}
                            defaultValue={`<iframe width="100%" height="600" frameborder="0" src="${embedLink}"></iframe>`}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <PreviewTable data={data} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <style jsx>{`
          @import 'fonts';
          @import 'colors';

          .container {
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .preview {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .error {
            color: $red;
          }

          .map-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .map {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .map-container {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .map-inner {
            position: absolute;
            height: 100%;
            width: 100%;
          }

          .embed {
            margin-top: auto;
            padding-top: 0.6em;
            font-size: 0.9rem;

            textarea {
              font-size: 0.8rem;
              font-family: $font-family-monospace;
              display: block;
              width: 100%;
              resize: none;
            }
          }

          .actions {
            :global(button) {
              margin-right: 7px;
              margin-bottom: 10px;
            }
          }
        `}</style>
      </Modal>
    )
  }
}

export default translate('dataset')(Preview)
