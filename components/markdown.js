import PropTypes from 'prop-types'
import marked from 'marked'

const Markdown = ({markdown, renderer}) => {
  const md = marked(markdown, {renderer})

  return (
    <div className='wrapper'>
      {/* eslint-disable react/no-danger */}
      <div dangerouslySetInnerHTML={{__html: md}} />
      {/* eslint-enable react/no-danger */}

      <style jsx>{`
        .wrapper {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
        }

        .wrapper {
          :global(pre) {
            white-space: pre-wrap;
            font-family: inherit;
          }

          :global(code) {
            font-family: inherit;
          }

          :global(:last-child) {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  )
}

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  renderer: PropTypes.object
}

Markdown.defaultProps = {
  renderer: null
}

export default Markdown
