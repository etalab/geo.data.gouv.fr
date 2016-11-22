import React from 'react'
import marked from 'marked'

const MarkdownViewer = ({markdown}) => {
  const md = marked(markdown)
  return <p dangerouslySetInnerHTML={{__html : md}} />
}

export default MarkdownViewer
