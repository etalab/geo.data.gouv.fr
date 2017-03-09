import React from 'react'

import Contact from './Contact'

import { divider } from './Contacts.css'

const Contacts = ({ contacts }) => {
  if (!contacts || !contacts.length) return <div>Aucun contact</div>

  return (
    <div>
      {contacts.map((contact, idx) =>
        <div key={idx}>
          <Contact contact={contact}/>
          {contacts[idx + 1] ? <div className={divider}></div> : null}
        </div>
      )}
    </div>
  )
}

export default Contacts
