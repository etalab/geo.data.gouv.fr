import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CloseIcon from 'react-icons/lib/md/cancel'

import Container from './container'

class Modal extends React.Component {
  static propTypes = {
    overlay: PropTypes.bool,
    fluid: PropTypes.bool,
    fullHeight: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: null,
    overlay: true,
    fluid: false,
    fullHeight: false
  }

  constructor(props) {
    super(props)

    this.node = document.createElement('div')
  }

  componentDidMount() {
    document.body.appendChild(this.node)
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    document.body.removeChild(this.node)
    document.removeEventListener('keydown', this.onKeyDown, false)
    this.node = null
  }

  onKeyDown = e => {
    const {onClose} = this.props

    if (e.keyCode === 27 /* ESC */) {
      onClose()
    }
  }

  render() {
    const {children, title, overlay, fluid, fullHeight, onClose} = this.props

    if (!process.browser) {
      return null
    }

    return ReactDOM.createPortal(
      <div className={`modal ${overlay ? 'overlay' : ''}`}>
        <Container fluid={fluid}>
          <div className={`content ${fullHeight ? 'full-height' : ''}`}>
            <nav>
              {title && <h2>{title}</h2>}
              <span onClick={onClose}>
                <CloseIcon style={{verticalAlign: 0}} />
              </span>
            </nav>
            {children}
          </div>
        </Container>

        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>

        <style jsx>{`
          @import 'colors';

          .modal {
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;

            display: flex;
            flex-direction: column;
          }

          .overlay {
            background-color: rgba(0, 0, 0, 0.7);
          }

          h2 {
            margin: 0;
            font-size: 24px;
            padding-right: 50px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;

            @media (max-width: 551px) {
              font-size: 20px;
            }
          }

          span {
            position: absolute;
            right: 0;
            top: 0;

            color: darken($lightgrey, 10%);
            font-size: 32px;

            &:hover {
              color: darken($lightgrey, 20%);
              cursor: pointer;
            }

            @media (max-width: 551px) {
              font-size: 24px;
            }
          }

          nav {
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid $lightgrey;
            position: relative;
          }

          .content {
            background: $white;
            border-radius: 2px;
            margin: 20px 0;
            padding: 20px;
            padding: 1.5em 1.7em;
            padding-top: 12px;
            display: block;

            @media (max-width: 551px) {
              padding: 1em;
            }
          }

          .full-height {
            display: flex;
            flex-direction: column;
            flex: 1;
          }
        `}</style>
      </div>,
      this.node
    )
  }
}

export default Modal
