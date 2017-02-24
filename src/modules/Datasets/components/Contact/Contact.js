import React from 'react'

import { container } from './Contact.css'

const Contact = ({ contact }) => {
  const unknown = 'Non renseigné'

  if (!contact) return <div>{unknown}</div>

  return (
    <div className={container}>
      <div>{contact.nom ? contact.nom : unknown}</div>
      <div>{contact.address ? contact.address : unknown}</div>
      <div><i className="call icon"></i>{contact.tel ? contact.tel : unknown}</div>
      <div><i className="mail outline icon"></i>
        {contact.mail ? <a href={`mailto:${contact.mail}`}>{contact.mail}</a> : unknown}
      </div>
    </div>
  )
}

export default Contact
