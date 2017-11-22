import React from 'react'
import PropTypes from 'prop-types'
import prune from 'underscore.string/prune'
import { translate } from 'react-i18next'

import PlusIcon from 'react-icons/lib/fa/plus-circle'
import MinusIcon from 'react-icons/lib/fa/minus-circle'

import Markdown from './markdown'

class MarkdownPreview extends React.Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    limit: PropTypes.number,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    limit: 1000
  }

  state = {
    expanded: false
  }

  toggleExpanded = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render() {
    const { markdown, limit, t } = this.props
    const { expanded } = this.state

    return (
      <div>
        <Markdown markdown={expanded ? markdown : prune(markdown, limit)} />

        {markdown.length > limit && (
          <b onClick={this.toggleExpanded}>
            {expanded ? (
              <span>
                <MinusIcon style={{ verticalAlign: -2 }} /> {t('displayLess')}
              </span>
            ) : (
              <span>
                <PlusIcon style={{ verticalAlign: -2 }} /> {t('displayMore')}
              </span>
            )}
          </b>
        )}

        <style jsx>{`
          @import 'colors';

          b {
            margin-top: 1em;
            display: block;
            color: $blue;
            text-align: right;

            &:hover {
              cursor: pointer;
              color: darken($blue, 10%);
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(MarkdownPreview)
