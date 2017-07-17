import React, { PureComponent } from 'react'
import { wrapper, input, button } from './SearchInput.scss'

class SearchInput extends PureComponent {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSearch(event.target.query.value);
  }

  render() {
    const { placeholder, textInput } = this.props

    return (
      <form onSubmit={this.onSubmit} className={wrapper}>
        <input
          type='text'
          name='query'
          defaultValue={textInput}
          className={input}
          placeholder={placeholder ? placeholder : 'Rechercher…'} />

        {this.props.searchButton && (
          <button type='submit' className={button}>Rechercher</button>
        )}
      </form>
    )
  }
}

export default SearchInput
