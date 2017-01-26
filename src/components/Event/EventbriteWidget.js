import React from 'react'

const EventbriteWidget = ({ src }) => {
  return <iframe
            src={src}
            frameBorder="0"
            height="379"
            width="195"
            marginHeight="0"
            marginWidth="0"
            scrolling="no" />
}

export default EventbriteWidget
