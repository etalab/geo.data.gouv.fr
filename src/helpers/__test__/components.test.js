import Promise from 'bluebird'
import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { cancelAllPromises, waitForDataAndSetState } from '../components'
import { makeCancelable } from '../promises'

function reflect(promise) {
  return Promise.resolve(promise).reflect()
}

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [] }
  }

  render() {
    return <div />
  }
}

function fakePromise() {
  return new Promise((resolve) => {
    setImmediate(() => resolve())
  })
}

function rejectedPromise() {
  return new Promise((resolve, reject) => {
    setImmediate(() => reject(new Error('fakeReject')))
  })
}

describe('components', () => {
  describe('cancelAllPromises', () => {
    it('should return when component has no promises', () => {
      const component = shallow(<TestComponent />)

      expect(cancelAllPromises(component)).to.not.exist
    })

    it('should return cancelAll function', () => {
      const component = shallow(<TestComponent />)
      component.cancelablePromises = [makeCancelable(fakePromise()), makeCancelable(fakePromise())]
      cancelAllPromises(component)
      const canceledPromises = component.cancelablePromises.map(c => reflect(c.promise))

      return Promise.all(canceledPromises, canceledPromise => {
        expect(canceledPromise.isRejected()).to.be.true
        expect(canceledPromise.reason.isCanceled).to.be.true
      })
    })
  })

  describe('waitForDataAndSetState', () => {
    it('should create a cancelablePromises array to component when no exist', () => {
      const component = shallow(<TestComponent />).instance()

      expect(component.cancelablePromises).to.not.exist
      waitForDataAndSetState(fakePromise(), component, 'stateName')
      expect(component.cancelablePromises).to.exist
    })

    it('should add to cancelablePromises component array new cancelablePromise', () => {
      const component = shallow(<TestComponent />).instance()
      component.cancelablePromises = []

      waitForDataAndSetState(fakePromise(), component, 'stateName')
      expect(component.cancelablePromises.length).to.equal(1)
    })

    describe('resolve', () => {
      it('should assing data to state when promise resolve', () => {
        const component = shallow(<TestComponent />).instance()

        return waitForDataAndSetState(Promise.resolve('fakeResolve'), component, 'stateName')
          .then(() => expect(component.state.stateName).to.exist)
      })
    })

    describe('reject', () => {
      it('should assing error to state when promise reject', () => {
        const component = shallow(<TestComponent />).instance()

        return waitForDataAndSetState(rejectedPromise(), component, 'stateName')
          .then(() => expect(component.state.errors.length).to.equal(1))
      })

      it('should not assing twice error to state', () => {
        const component = shallow(<TestComponent />).instance()

        return waitForDataAndSetState(rejectedPromise(), component, 'stateName')
          .then(() => {
            expect(component.state.errors.length).to.equal(1)
            return waitForDataAndSetState(rejectedPromise(), component, 'stateName')
              .then(() => expect(component.state.errors.length).to.equal(1))
          })
      })
    })
  })
})
