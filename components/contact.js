import React from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import PhoneIcon from 'react-icons/lib/fa/phone'
import EmailIcon from 'react-icons/lib/fa/envelope-o'

const Contact = ({contact, t}) => (
  <div className='container'>
    <div className='header'>
      <div className='name'>
        {contact.organizationName || t('enums.unknownData.notSpecified')}
      </div>

      <div className={`role ${contact.role}`}>
        {t([`enums.role.${contact.role}`, 'enums.unknownData.unknown'])}
      </div>
    </div>

    {contact.address && (
      <div className='address'>
        {contact.address[0]} {contact.town} - {contact.postalCode} {contact.country}
      </div>
    )}

    {(contact.phoneNumber || contact.email) && (
      <div className='contact'>
        {contact.phoneNumber && (
          <div>
            <PhoneIcon /> {contact.phoneNumber}
          </div>
        )}

        {contact.email && (
          <div className='email'>
            <div>
              <EmailIcon style={{verticalAlign: -1}} />
            </div>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        )}
      </div>
    )}

    <style jsx>{`
      @import 'colors';

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      .name {
        font-weight: 600;
      }

      .address {
        margin-top: 0.5em;
      }

      .contact {
        margin-top: 0.5em;

        :global(svg) {
          margin-right: 5px;
        }
      }

      .email {
        display: flex;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
      }

      .role {
        font-size: small;
        padding: 1px 5px;
        border-radius: 2px;
        margin-left: 5px;

        background-color: $grey;
        color: $white;

        &.processor {
          background-color: $blue;
        }

        &.resource-provider {
          background-color: $blue;
        }

        &.principal-investigator {
          background-color: $green;
        }

        &.publisher {
          background-color: $green;
        }

        &.owner {
          background-color: #21ba45;
        }

        &.author {
          background-color: $yellow;
        }

        &.custodian {
          background-color: #a333c8;
        }

        &.user {
          background-color: #e03997;
        }

        &.distributor {
          background-color: #f2711c;
        }

        &.originator {
          background-color: $red;
        }

        &.point-of-contact {
          background-color: #a5673f;
        }

        &.sponsor {
          background-color: $black;
        }
      }
    `}</style>
  </div>
)

Contact.propTypes = {
  contact: PropTypes.shape({
    organizationName: PropTypes.string,
    role: PropTypes.string.isRequired,
    address: PropTypes.arrayOf(PropTypes.string),
    town: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate()(Contact)
