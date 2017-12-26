import PropTypes from 'prop-types'

import CheckIcon from 'react-icons/lib/fa/check'
import FailIcon from 'react-icons/lib/fa/close'

const Check = ({title, isValid, children}) => (
  <div className={`container ${isValid ? 'valid' : ''}`}>
    <h4>
      {title}
      <i className={isValid ? 'valid' : null}>
        {isValid ? (
          <CheckIcon style={{verticalAlign: -2}} />
        ) : (
          <FailIcon style={{verticalAlign: -3}} />
        )}
      </i>
    </h4>
    <div className='body'>
      {children}
    </div>

    <style jsx>{`
      @import 'colors';

      .container {
        margin-bottom: 1.3em;
      }

      .body {
        border-left: 2px solid $red;
        padding: 0.2em 0 0.2em 0.6em;
      }

      h4 {
        margin-bottom: 0.4em;
      }

      i {
        color: $red;
        margin-left: 5px;
      }

      .valid {
        i {
          color: $green;
        }

        .body {
          border-color: $green;
        }
      }
    `}</style>
  </div>
)

Check.propTypes = {
  title: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Check
