import React from 'react'

const Social = () => (
  <ul className='social'>
    <li>
      <a href='https://twitter.com/geodatagouv'>
        <img src='/static/images/social/twitter.svg' alt='Twitter' />
      </a>
    </li>
    <li>
      <a href='https://github.com/etalab/geo.data.gouv.fr'>
        <img src='/static/images/social/github.svg' alt='Github' />
      </a>
    </li>
    <li>
      <a href='https://medium.com/geo-data-gouv-fr'>
        <img src='/static/images/social/medium.svg' alt='Medium' />
      </a>
    </li>
    <li>
      <a href='mailto:geo@data.gouv.fr'>
        <img src='/static/images/social/email.svg' alt='Email' />
      </a>
    </li>

    <style jsx>{`
      ul {
        list-style-type: none;
        padding: 0;
        margin: 1em 0 0;
      }

      li {
        display: inline;
        margin-right: 1em;
      }

      img {
        width: 25px;
      }
    `}</style>
  </ul>
)

export default Social
