import React from 'react'

const LinksSection = ({links, style}) => {
  const getName = (link) => link.name ? link.name : link.href;
  return (
    <div>
      <h3>Liens</h3>

      <ul>
        {links.map( (link, idx) => <li><a style={{wordWrap: 'break-word'}} key={idx} href={link.href}>{getName(link)}</a></li>)}
      </ul>
    </div>
  )
}

export default LinksSection
