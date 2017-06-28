import React, { PureComponent } from 'react'
import { wrapper, input, button } from './SearchInput.css'

class SearchInput extends PureComponent {
  onSubmit(event) {
    event.preventDefault();

    this.props.onSearch(event.target.query.value);
  }

  render() {
    const { placeholder, textInput } = this.props

    return (
      <form onSubmit={e => this.onSubmit(e)} className={wrapper}>
        <input
          type='text'
          name='query'
          value={textInput}
          className={input}
          placeholder={placeholder ? placeholder : 'Rechercher…'} />

        {this.props.searchButton ? <button type='submit' className={button}>Rechercher</button> : undefined}
      </form>
    )
  }
}

export default SearchInput
