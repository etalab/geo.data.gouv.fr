import React, { Component } from 'react'
import { wrapper, input, button } from './SearchInput.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = { textInput: props.textInput || '' }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.textInput || this.props.textInput === nextProps.textInput) return
    this.setState({ textInput: nextProps.textInput })
  }

  onChange(event) {
    this.setState({textInput: event.target.value});
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onSearch(this.state.textInput)
    }
  }

  search() {
    this.props.onSearch(this.state.textInput)
  }

  render() {
    return (
      <div className={wrapper}>
        <input
          type='text'
          value={this.state.textInput}
          className={input}
          onChange={e => this.onChange(e)}
          onKeyPress={e => this.onKeyPress(e)}
          placeholder="Rechercher..." />
        {this.props.searchButton ? <button className={button} onClick={() => this.search()}>Rechercher</button> : undefined}
      </div>
    )
  }
}

export default SearchInput
