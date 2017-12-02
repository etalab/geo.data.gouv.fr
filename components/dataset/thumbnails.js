import React from 'react'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash'

import { GEODATA_API_URL } from '@env'

class Thumbnails extends React.Component {
  static propTypes = {
    recordId: PropTypes.string.isRequired,
    thumbnails: PropTypes.arrayOf(PropTypes.shape({
      originalUrlHash: PropTypes.string.isRequired,
      description: PropTypes.string
    })).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: props.thumbnails[0]
    }
  }

  selectThumbnail = thumbnail => () => {
    this.setState({
      selected: thumbnail
    })
  }

  render() {
    const { recordId, thumbnails } = this.props
    const { selected } = this.state

    const thumbs = uniqBy(thumbnails, 'originalUrlHash')

    return (
      <div>
        <div className='thumbnail'>
          <img src={`${GEODATA_API_URL}/records/${recordId}/thumbnails/${selected.originalUrlHash}`} alt='' />
        </div>
        {thumbs.length > 1 && (
          <div className='list'>
            {thumbs.map(thumbnail => (
              <img
                key={thumbnail.originalUrlHash}
                src={`${GEODATA_API_URL}/records/${recordId}/thumbnails/${thumbnail.originalUrlHash}`}
                className={thumbnail.originalUrlHash === selected.originalUrlHash && 'selected'}
                alt={thumbnail.description}
                onClick={this.selectThumbnail(thumbnail)}
              />
            ))}
          </div>
        )}

        <style jsx>{`
          @import 'colors';

          .thumbnail {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 180px;

            img {
              display: block;
              align-self: center;
              max-width: 100%;
              max-height: 100%;
            }
          }

          .list {
            display: flex;
            border-top: 1px solid $lightgrey;
            margin-top: 1em;
            padding-top: 0.6em;

            img {
              display: block;
              width: 70px;
              align-self: center;
              opacity: 0.4;
              filter: grayscale(100%);
              margin-right: 0.4em;
              margin-top: 0.4em;

              &:hover {
                &:not(.selected) {
                  cursor: pointer;
                  opacity: 0.5;
                  filter: none;
                }
              }
            }

            .selected {
              opacity: 1;
              filter: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Thumbnails
