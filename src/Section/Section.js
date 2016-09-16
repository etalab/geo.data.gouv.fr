import React from 'react'

const Section = ({title, component}) => {
  return (
    <div className="section sixteen wide column">
      <div className="ui header">{title}</div>
      <div className="ui divider"></div>
      {component}
    </div>
      )
}

export default Section
