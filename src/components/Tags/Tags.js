import React from 'react'
import PropTypes from 'prop-types'

const Tags = ({ tags }) => (
  <div>
    {tags.map((tag, idx) => (
      <a className='ui small tag label' key={idx}>
        {tag}
      </a>
    ))}
  </div>
)

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tags
