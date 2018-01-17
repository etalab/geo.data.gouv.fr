import PropTypes from 'prop-types'

import WarningIcon from 'react-icons/lib/fa/exclamation-triangle'

const Warning = ({children}) => (
  <div className='container'>
    <span className='icon'>
      <WarningIcon />
    </span>
    <div>{children}</div>

    <style jsx>{`
      @import 'colors';

      .container {
        background-color: lighten($yellow, 45%);
        padding: 0.8em;
        border-radius: 2px;
        display: flex;
        align-items: center;
      }

      .icon {
        color: lighten($yellow, 20%);
        font-size: 1.8em;
        margin-right: 0.9rem;
      }
    `}</style>
  </div>
)

Warning.propTypes = {
  children: PropTypes.node.isRequired
}

export default Warning
