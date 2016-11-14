import React, { Component } from 'react'
import { theme } from '../../tools'
import './Filter.css'

const style = {
  backgroundColor: theme.blue,
}

function getIcon(type) {
  switch (type) {
    case 'keyword':
      return <i className='fa fa-tag fa-fw'></i>
    case 'organization':
      return <i className='fa fa-building fa-fw'></i>
    default:
     return <i className='fa fa-tag fa-fw'></i>
  }
}

class Filter extends Component {
  render() {
    return (
      <button className="filter-button" style={style} onClick={() => this.props.onClick({name: this.props.type, value: this.props.value})}>
        {getIcon(this.props.type)} {this.props.value}
      </button>
    )
  }
}

export default Filter
