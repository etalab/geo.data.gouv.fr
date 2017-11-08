import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Link from '../../link'

import Thumbnail from './thumbnail'

const Result = ({ result: { _id, recordId, metadata }, i18n, t }) => (
  <Link href={`/dataset?id=${_id}`} as={`/datasets/${_id}`}>
    <a>
      <Thumbnail thumbnails={metadata.thumbnails} recordId={recordId} />

      <div className='content'>
        <div className='description'>
          <h3>{metadata.title}</h3>

          {metadata.inspireTheme && (
            <div className='inspire'>
              <img
                src={`/static/images/datasets/inspire/${metadata.inspireTheme.id}.svg`}
                title={metadata.inspireTheme.label[i18n.language]}
                alt={metadata.inspireTheme.label[i18n.language]}
              />
            </div>
          )}
        </div>

        {/* {metadata.description && (
          <MarkdownSummary markdown={metadata.description} />
        )}
        <div className='footer'>
          <DatasetInfo metadata={metadata} />
        </div> */}
      </div>
      <style jsx>{`
        @import 'colors';

        a {
          display: flex;
          margin-bottom: 1.5em;
          color: $black;
          box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);

          &:focus, &:hover {
            color: $black;
          }

          @media (max-width: 768px) {
            flex-direction: column;
          }
        }

        .content {
          width: 100%;
          padding: 1em;
          border-left: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;

          @media (max-width: 768px) {
            border: 0 none;
          }
        }

        .description {
          display: flex;

          h3 {
            flex-grow: 1;
            margin-bottom: 0.8rem;
          }
        }

        .inspire {
          padding-left: 10px;

          img {
            width: 30px;
          }
        }

        .footer {
          margin-top: auto;

          @media (max-width: 768px) {
            margin-top: 10px;
          }
        }
      `}</style>
    </a>
  </Link>
)

Result.propTypes = {
  result: PropTypes.shape({
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,

  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
}

export default translate('search')(Result)
