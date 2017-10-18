import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import styles from './Markdown.scss'

const Markdown = ({ markdown, renderer }) => {
  const md = marked(markdown, { renderer })
  return (
    <div
      className={`${styles.wrapper}`}
      dangerouslySetInnerHTML={{ __html : md }}
    />
  )
}

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  renderer: PropTypes.object
}

export default Markdown
