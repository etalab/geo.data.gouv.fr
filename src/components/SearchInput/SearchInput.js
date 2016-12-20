import React, { Component } from 'react'
import { wrapper, input, button } from './SearchInput.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = { textInput: this.props.textInput || '' }
  }

  handleChange(event) {
    this.setState({textInput: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.handleTextChange(this.state.textInput)
    }
  }

  search() {
    this.props.handleTextChange(this.state.textInput)
  }

  render() {
    return (
      <div className={wrapper}>
        <input
          type='text'
          value={this.state.textInput}
          className={input}
          onChange={(e) => this.handleChange(e)}
          onKeyPress={(e) => this.handleKeyPress(e)}
          placeholder="Rechercher..." />
        {this.props.searchButton ? <button className={button} onClick={() => this.search()}>Rechercher</button> : undefined}
      </div>
    )
  }
}

export default SearchInput
