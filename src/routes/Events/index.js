export default store => ({
  path: 'events',

  async getComponent(nextState, cb) {
    const EventsContainer = await import(/* webpackChunkName: 'events' */ './containers/EventsContainer')

    cb(null, EventsContainer.default)
  }
})
