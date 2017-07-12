import React from 'react'
import marked from 'marked'
import styles from './MarkdownViewer.scss'

const MarkdownViewer = ({markdown}) => {
  const md = marked(markdown)
  return <p className={styles.markdownWrapper} dangerouslySetInnerHTML={{__html : md}} />
}

export default MarkdownViewer
