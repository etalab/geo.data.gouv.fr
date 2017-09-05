import React from 'react'
import PropTypes from 'prop-types'

import styles from './DatasetThumbnails.scss'

class DatasetThumbnails extends React.PureComponent {
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

  selectThumbnail = thumbnail => event => {
    this.setState({
      selected: thumbnail
    })

    event.preventDefault()
  }

  render() {
    const { recordId, thumbnails } = this.props
    const { selected } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src={`https://inspire.data.gouv.fr/api/geogw/records/${recordId}/thumbnails/${selected.originalUrlHash}`}
            alt=''
          />
        </div>
        {thumbnails.length > 1 && (
          <div className={styles.list}>
            {thumbnails.map(thumbnail => (
              <div key={thumbnail.originalUrlHash} className={styles.thumbContainer}>
                <img
                  src={`https://inspire.data.gouv.fr/api/geogw/records/${recordId}/thumbnails/${thumbnail.originalUrlHash}`}
                  className={thumbnail === selected && styles.selected}
                  alt={thumbnail.description}
                  onClick={this.selectThumbnail(thumbnail)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default DatasetThumbnails
