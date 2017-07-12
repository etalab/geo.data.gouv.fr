import React from 'react'

import { translateRole, tagsColors } from '../../../../helpers/roles'

import { container, name, tag } from './Contact.scss'

const Contact = ({ contact }) => {
  const unknown = 'Non renseigné'
  const address = contact.address ?
    `${contact.address[0]} ${contact.town} - ${contact.postalCode} ${contact.country}` :
    null

  if (!contact) return <div>{unknown}</div>

  return (
    <div className={container}>
      <div className={name}>
        <div>{contact.organizationName ? contact.organizationName : unknown}</div>
        <div className={tag} style={{backgroundColor: tagsColors[contact.role]}}>{translateRole(contact.role)}</div>
      </div>
      <div>{address}</div>
      <div><i className="call icon"></i>{contact.phoneNumber ? contact.phoneNumber : unknown}</div>
      <div><i className="mail outline icon"></i>
        {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : unknown}
      </div>
    </div>
  )
}

export default Contact
