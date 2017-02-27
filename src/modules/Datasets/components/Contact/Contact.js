import React from 'react'

import { container, name, tag } from './Contact.css'

import { colors } from '../../../../tools'

const tags = {
  producer: colors[0],
  distributor: colors[1],
}

const Contact = ({ contact }) => {
  const unknown = 'Non renseigné'

  if (!contact) return <div>{unknown}</div>

  return (
    <div className={container}>
      <div className={name}>
        <div>{contact.nom ? contact.nom : unknown}</div>
        <div className={tag} style={{backgroundColor: tags[contact.role]}}>{contact.role}</div>
      </div>
      <div>{contact.address ? contact.address : unknown}</div>
      <div><i className="call icon"></i>{contact.tel ? contact.tel : unknown}</div>
      <div><i className="mail outline icon"></i>
        {contact.mail ? <a href={`mailto:${contact.mail}`}>{contact.mail}</a> : unknown}
      </div>
    </div>
  )
}

export default Contact
