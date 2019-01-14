import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Link from '../../link'
import MarkdownSummary from '../../markdown-summary'

import Thumbnail from './thumbnail'
import Footer from './footer'

const Result = ({id, result, i18n}) => (
  <Link prefetch href={`/dataset?did=${id}`} as={`/datasets/${id}`}>
    <a>
      <Thumbnail id={id} thumbnail={result.thumbnail} />

      <div className='content'>
        <div className='description'>
          <h3>{result.title}</h3>

          {result.inspireTheme && (
            <div className='inspire'>
              <img
                src={`/static/images/datasets/inspire/${result.inspireTheme}.svg`}
                // title={metadata.inspireTheme.label[i18n.language]}
                // alt={metadata.inspireTheme.label[i18n.language]}
              />
            </div>
          )}
        </div>

        {result.description && (
          <MarkdownSummary markdown={result.description} />
        )}

        <div className='footer'>
          <Footer result={result} />
        </div>
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

          @media (max-width: 767px) {
            flex-direction: column;
          }
        }

        .content {
          width: 100%;
          padding: 1em;
          border-left: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;

          @media (max-width: 767px) {
            border: 0 none;
          }
        }

        .description {
          display: flex;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;

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

          @media (max-width: 767px) {
            margin-top: 10px;
          }
        }
      `}</style>
    </a>
  </Link>
)

Result.propTypes = {
  id: PropTypes.string.isRequired,
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    inspireTheme: PropTypes.string
  }).isRequired,

  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

export default translate('search')(Result)
