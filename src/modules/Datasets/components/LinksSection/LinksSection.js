import React from 'react'
import { linkList } from './LinksSection.css'

const LinksSection = ({links, style}) => {
  // Some links have no name, use href as fallback
  const getName = (link) => link.name ? link.name : link.href;

  return (
    <div>
      <h3>Liens</h3>
      {links.length ? (
        <ul className={linkList}>
          {links.map( (link, idx) => <li key={idx}><a style={style} href={link.href}>{getName(link)}</a></li>)}
        </ul> ) :
        <div>Aucun lien disponible</div>
      }
    </div>
  )
}

export default LinksSection
