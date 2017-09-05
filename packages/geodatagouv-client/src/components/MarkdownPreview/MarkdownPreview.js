import React from 'react'
import PropTypes from 'prop-types'
import prune from 'underscore.string/prune'

import Markdown from '../Markdown'

import styles from './MarkdownPreview.scss'

class MarkdownPreview extends React.PureComponent {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    limit: PropTypes.number
  }

  static defaultProps = {
    limit: 1000
  }

  state = {
    expanded: false
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render() {
    const { markdown, limit } = this.props
    const { expanded } = this.state

    return (
      <div className={styles.container}>
        <Markdown markdown={expanded ? markdown : prune(markdown, limit)} />

        {markdown.length > limit && (
          <button className={styles.button} onClick={this.toggleExpanded}>
            { expanded ? 'Réduire' : 'Afficher la suite' }
          </button>
        )}
      </div>
    )
  }
}

export default MarkdownPreview
