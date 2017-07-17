import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'search',

  async getComponent(nextState, cb) {
    const search = await import(/* webpackChunkName: 'search' */ './modules/search')
    const SearchContainer = await import(/* webpackChunkName: 'search' */ './containers/SearchContainer')

    injectReducer(store, {
      key: 'search',
      reducer: search.reducer
    })

    cb(null, SearchContainer.default)
  },

  async onEnter({ location }) {
    const search = await import(/* webpackChunkName: 'search' */ './modules/search')

    injectReducer(store, {
      key: 'search',
      reducer: search.reducer
    })

    store.dispatch(search.actions.execute(
      search.query.parse(location.query)
    ))
  },

  onChange(oldState, newState) {
    this.onEnter(newState)
  }
})
