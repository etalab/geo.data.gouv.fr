import React from 'react'

const EventbriteWidget = ({ src, title = '' }) => (
  <iframe
    src={src}
    title={title}
    frameBorder="0"
    height="379"
    width="195"
    marginHeight="0"
    marginWidth="0"
    scrolling="no" />
)

export default EventbriteWidget
