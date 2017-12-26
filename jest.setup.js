/* eslint-disable import/no-unassigned-import */

import 'raf/polyfill'
import 'mock-local-storage'

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
