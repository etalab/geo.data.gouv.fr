import React from 'react'
import PropTypes from 'prop-types'

const Container = ({children, fluid}) => (
  <div style={{
    maxWidth: fluid ? null : 1200
  }}
  >
    {children}

    <style jsx>{`
      div {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    `}</style>
  </div>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool
}

Container.defaultProps = {
  fluid: false
}

export default Container
