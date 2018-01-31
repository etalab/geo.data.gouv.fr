import React from 'react'
import PropTypes from 'prop-types'

import Container from '../container'

const PageTitle = ({children, title, icon}) => (
  <div className='head'>
    <Container>
      <div className='row'>
        <div className='icon'>{icon}</div>
        <div className='text'>
          <h1>{title}</h1>
          <p className='description'>{children}</p>
        </div>
      </div>
    </Container>
    <style jsx>{`
      @import 'colors';

      .head {
        background-color: $blue;
      }

      .row {
        display: flex;
        align-items: center;
        max-width: 1400px;
        margin-top: 0;
        color: $white;
        padding: 40px;
      }

      .icon {
        font-size: 56px;
      }

      .text {
        padding-left: 40px;
      }

      .description {
        margin: 0 auto 2em;
        max-width: 640px;
        font-size: 1.1em;
        font-style: italic;
        margin-bottom: 0;
      }
      `}</style>
  </div>
)

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
}

export default PageTitle
