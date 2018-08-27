import React from 'react'
import renderer from 'react-test-renderer'
import i18n from 'i18next'
import {I18nextProvider} from 'react-i18next'

import Link from '../../components/link'

const i18next = i18n.init({ // eslint-disable-line import/no-named-as-default-member
  load: 'languageOnly'
})

describe('<Link />', () => {
  it('should render as french', () => {
    const inst = i18next.cloneInstance()
    inst.changeLanguage('fr')

    const tree = renderer
      .create(
        <I18nextProvider i18n={inst}>
          <Link href='/foo'>
            <a>Go somewhere</a>
          </Link>
        </I18nextProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render the as property', () => {
    const inst = i18next.cloneInstance()
    inst.changeLanguage('de')

    const tree = renderer
      .create(
        <I18nextProvider i18n={inst}>
          <Link href='/foo' as='/bar'>
            <a>Go somewhere</a>
          </Link>
        </I18nextProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should use the default language', () => {
    const inst = i18next.cloneInstance()

    const tree = renderer
      .create(
        <I18nextProvider initialLanguage='ru' i18n={inst}>
          <Link href='/foo'>
            <a>Go somewhere</a>
          </Link>
        </I18nextProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
