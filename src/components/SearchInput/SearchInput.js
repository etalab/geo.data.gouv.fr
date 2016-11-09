import React, { Component } from 'react'
import './SearchInput.css'

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

  removeFilter(name, value) {
    this.props.removeFilter({name, value})
  }

  render() {
    return (
      <div className='search-input-wrapper'>
        <input
          type='text'
          value={this.state.textInput}
          className='search-input'
          onChange={(e) => this.handleChange(e)}
          onKeyPress={(e) => this.handleKeyPress(e)}
          placeholder="Search..." />
          <button className='ui large button' onClick={() => this.search()}>Search</button>
        <button >Search</button>
      </div>
    )
  }
}

export default SearchInput
