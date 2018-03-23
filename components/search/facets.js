import React from 'react'
import PropTypes from 'prop-types'

import FacetGroup from './facet-group'

class Facets extends React.Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.array.isRequired
    })).isRequired,

    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  setWrapperRef = ref => {
    this.wrapperRef = ref
  }

  onWrapperClick = e => {
    const {onClose} = this.props

    if (this.wrapperRef === e.target) {
      onClose()
    }
  }

  render() {
    const {groups, open} = this.props

    if (groups.length === 0) {
      return null
    }

    return (
      <div ref={this.setWrapperRef} className={open ? 'wrapper open' : 'wrapper'} onClick={this.onWrapperClick}>
        <div className='facets'>
          {groups.map(({name, values}) => (
            <FacetGroup
              key={name}
              name={name}
              values={values}
            />
          ))}
        </div>

        <style jsx>{`
          @import 'colors';

          .wrapper {

            @media (max-width: 960px) {
              display: none;
            }
          }

          .facets {
            background-color: $white;
            margin-left: 2em;
            width: 300px;
          }

          .open {
            @media (max-width: 960px) {
              display: block;
              position: fixed;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.2);
              overflow: auto;
              z-index: 2;
              -webkit-overflow-scrolling: touch;

              .facets {
                width: 80%;
                position: absolute;
                min-height: 100vh;
                top: 0;
                right: 0;
                background: #fff;
                box-shadow: -2px 0 2px rgba(0, 0, 0, 0.2);
                padding: 2em 1em 2em 1.5em;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Facets
