import React from 'react'

const LinksSection = ({links, style}) => {
  return (
    <div>
      <h3>Liens</h3>

      {links.map( (link, idx) => <a key={idx} href={link.href}>{link.name}</a>)}
    </div>
  )
}

export default LinksSection
