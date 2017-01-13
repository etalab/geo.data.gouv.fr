import React from 'react'
import { linkList } from './LinksSection.css'

const LinksSection = ({links, style}) => {
  return (
    <div>
      <h3>Liens</h3>
      {links.length ? (
        <ul className={linkList}>
          {links.map( (link, idx) => <li key={idx}><a style={style} href={link.href}>{link.name}</a></li>)}
        </ul> ) :
        <div>Aucun lien disponible</div>
      }
    </div>
  )
}

export default LinksSection
