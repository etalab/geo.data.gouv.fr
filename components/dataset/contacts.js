import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Contact from '../contact'

const Contacts = ({contacts}) => (
  <div>
    {contacts.map((contact, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={key} className='contact'>
        <Contact contact={contact} />
      </div>
    ))}

    <style jsx>{`
      @import 'colors';

      .contact:not(:last-child) {
        border-bottom: 1px solid $lightgrey;
        padding-bottom: 1em;
        margin-bottom: 1em;
      }
    `}</style>
  </div>
)

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default translate('dataset')(Contacts)
