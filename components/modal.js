import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CloseIcon from 'react-icons/lib/md/cancel'

import Container from './container'

class Modal extends React.Component {
  static propTypes = {
    overlay: PropTypes.bool,
    fluid: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    overlay: true,
    fluid: false
  }

  componentWillMount() {
    this.node = document.createElement('div')
    document.body.appendChild(this.node)
    document.body.classList.add('no-scroll')
  }

  componentWillUnmount() {
    document.body.removeChild(this.node)
    document.body.classList.remove('no-scroll')
    this.node = null
  }

  render() {
    const { children, overlay, fluid, onClose } = this.props

    if (!process.browser) {
      return null
    }

    return ReactDOM.createPortal(
      <div className={`modal ${overlay ? 'overlay' : ''}`}>
        <Container fluid={fluid}>
          <nav>
            <span onClick={onClose}>
              <CloseIcon />
            </span>
          </nav>

          <div className='content'>
            {children}
          </div>
        </Container>

        <style jsx>{`
          @import 'colors';

          .modal {
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
          }

          .overlay {
            background-color: rgba(0, 0, 0, 0.7);
          }

          span {
            color: $white;
            font-size: 50px;
            opacity: 0.9;

            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }

          nav {
            text-align: right;
            padding: 10px 0;
          }

          .content {
            background: $white;
            border-radius: 2px;
            flex: 1;
            padding: 20px;
            margin-bottom: 20px;
            padding: 1.5em 1.7em;
            display: flex;
            flex-direction: column;

            @media (max-width: 551px) {
              padding: 1em;
            }
          }
        `}</style>
      </div>,
      this.node
    )
  }
}

export default Modal
