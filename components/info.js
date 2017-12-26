import PropTypes from 'prop-types'

import InfoIcon from 'react-icons/lib/fa/info-circle'

const Info = ({children}) => (
  <div className='container'>
    <span className='icon'>
      <InfoIcon />
    </span>
    <div>{children}</div>

    <style jsx>{`
      @import 'colors';

      .container {
        background-color: lighten($blue, 43%);
        padding: 0.8em;
        border-radius: 2px;
        display: flex;
        align-items: center;
      }

      .icon {
        color: lighten($blue, 20%);
        font-size: 1.8em;
        margin-right: 0.9rem;
      }
    `}</style>
  </div>
)

Info.propTypes = {
  children: PropTypes.node.isRequired
}

export default Info
