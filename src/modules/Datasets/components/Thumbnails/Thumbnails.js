import React, { Component } from 'react'

import { main, list, selected } from './Thumbnails.css'

class Thumbnails extends Component {
  constructor(props) {
    super(props)
    this.state = { isSelected: props.thumbnails[0]}
  }

  selectThumbnail(thumbnail) {
    this.setState({ isSelected: thumbnail })
  }

  render() {
    const { isSelected } = this.state
    const { recordId, thumbnails } = this.props

    const thumbnailsList = thumbnails.length > 1 ?
      thumbnails.map((thumbnail, idx) =>
        <div key={idx} onClick={() => this.selectThumbnail(thumbnail)}>
          <img className={thumbnail === isSelected ? selected : null} src={`https://inspire.data.gouv.fr/api/geogw/records/${recordId}/thumbnails/${thumbnail.originalUrlHash}`} alt={thumbnail.description} />
        </div>) : null

    return (
      <div>
        <div className={main}>
          <img src={`https://inspire.data.gouv.fr/api/geogw/records/${recordId}/thumbnails/${isSelected.originalUrlHash}`} alt={isSelected.originalUrlHash} />
        </div>
        <div className={list}>
          {thumbnailsList}
        </div>
      </div>
    )
  }
}

export default Thumbnails
