import React from 'react'
import PropTypes from 'prop-types'
import prune from 'underscore.string/prune'

import Markdown from './Markdown'

class Renderer {
  constructor({ maxLength }) {
    this.maxLength = maxLength || 500
  }

  p = 0

  paragraph = body => {
    if (body) {
      if (this.p < 1) {
        ++this.p

        body = body.trim()

        if (body.length > this.maxLength) {
          return prune(body, this.maxLength, '…')
        }

        return body.replace(/\s*[…,:;«»]$/, '…')
      }
    }

    return ''
  }

  text = body => body
  list = body => body
  heading = body => this.paragraph(body)
  code = body => this.paragraph(body)
  listitem = body => this.paragraph(body)

  link = href => href
  strong = body => `<b>${body}</b>`
  em = body => `<i>${body}</i>`
  codespan = body => body
  del = body => body

  br = () => ''
  hr = () => ''
  image = () => ''
  table = () => ''
  tablerow = () => ''
  tablecell = () => ''
  html = () => ''
}

const MarkdownSummary = ({ markdown, maxLength }) => {
  const renderer = new Renderer({ maxLength })

  return (
    <Markdown markdown={markdown} renderer={renderer} />
  )
}

MarkdownSummary.propTypes = {
  markdown: PropTypes.string.isRequired,
  maxLength: PropTypes.number
}

MarkdownSummary.defaultProps = {
  maxLength: 500
}

export default MarkdownSummary
