import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { translate } from 'react-i18next'

import { _get } from '../../../lib/fetch'

import Modal from '../../modal'

const CenteredMap = dynamic(import('../../centered-map'), {
  ssr: false,
  loading: translate()(({ t }) => t('loading'))
})

class Preview extends React.Component {
  static propTypes = {
    // distribution: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  state = {
    loading: true,
    data: null
  }

  async componentDidMount() {
    const { link } = this.props

    const data = await _get(`${link}?format=GeoJSON&projection=WGS84`)

    this.setState(() => ({
      loading: false,
      data
    }))
  }

  render() {
    const { onClose, t } = this.props
    const { loading, data } = this.state

    return (
      <Modal fluid onClose={onClose}>
        {loading ? t('common:loading') : (
          <div className='preview'>
            <div className='map-wrapper'>
              <div className='map'>
                <CenteredMap
                  vectors={data}
                  lat={47}
                  lon={1}
                  zoom={5.5}
                />
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .preview {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .map-wrapper {
            flex: 1;
            position: relative;
          }

          .map {
            position: absolute;
            height: 100%;
            width: 100%;
          }
        `}</style>
      </Modal>
    )
  }
}

export default translate('dataset')(Preview)
