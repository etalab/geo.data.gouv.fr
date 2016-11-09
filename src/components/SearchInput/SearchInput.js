import React, { Component } from 'react'
import './SearchInput.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = { textInput: this.props.textInput }
    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
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
      <div>
        <input
          type="text"
          value={this.state.textInput}
          className='search-input'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Search..." />
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}

export default SearchInput
