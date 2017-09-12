import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import styles from './Markdown.scss'

const Markdown = ({ markdown, ellipsis }) => {
  const md = marked(markdown)
  return (
    <p
      className={`${styles.wrapper} ${ellipsis && styles.ellipsis}`}
      dangerouslySetInnerHTML={{ __html : md }}
    />
  )
}

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  ellipsis: PropTypes.boolean
}

export default Markdown
