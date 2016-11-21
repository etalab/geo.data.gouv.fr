import React from 'react'
import Remarkable from 'remarkable'

const MarkdownViewer = ({markdown}) => {
  const md = new Remarkable().render(markdown)
  return <p dangerouslySetInnerHTML={{__html : md}} />
}

export default MarkdownViewer
