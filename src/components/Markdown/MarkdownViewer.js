import React from 'react'
import marked from 'marked'
import './MarkdownViewer.css'

const MarkdownViewer = ({markdown}) => {
  const md = marked(markdown)
  return <p className="markdown-wrapper" dangerouslySetInnerHTML={{__html : md}} />
}

export default MarkdownViewer
