import React from 'react'

const File = ({url, description}) => {
  return (
    <div className="item">
        <div className="ui image">
          <a href={url}><i className="file text outline huge icon"></i></a>
        </div>
        <div className="middle aligned content">{description}</div>
    </div>
  )
}

export default File
