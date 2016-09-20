import React from 'react'
import Accordion from '../Accordion/Accordion'

const Section = ({title, component}) => {
  return (
    <div className="section sixteen wide column">
      <Accordion
        header={true}
        active={true}
        title={<div className="ui header">{title}</div>}
        content={component} />
    </div>
      )
}

export default Section
