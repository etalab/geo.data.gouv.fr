import React, { Component } from 'react'

import { main, list, selected } from './Previews.css'

class Previews extends Component {
  constructor(props) {
    super(props)
    this.state = { isSelected: props.previews[0]}
  }

  selectPreview(preview) {
    this.setState({ isSelected: preview })
  }

  render() {
    const { isSelected } = this.state
    const { previews } = this.props

    const previewslist = previews.length > 1 ?
      previews.map((preview, idx) =>
        <div key={idx} onClick={() => this.selectPreview(preview)}>
          <img className={preview === isSelected ? selected : null} src={preview} alt="preview" />
        </div>) : null

    return (
      <div>
        <div className={main}>
          <img src={isSelected} alt="preview" />
        </div>
        <div className={list}>
          {previewslist}
        </div>
      </div>
    )
  }
}

export default Previews
