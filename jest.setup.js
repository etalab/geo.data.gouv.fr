/* eslint-disable import/no-unassigned-import */

import 'raf/polyfill'
import 'mock-local-storage'

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {setConfig} from 'next/config'

configure({adapter: new Adapter()})

// Initialize Next.js configuration with empty values.
setConfig({
  publicRuntimeConfig: {},
  secretRuntimeConfig: {}
})
