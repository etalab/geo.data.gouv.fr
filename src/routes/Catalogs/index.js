import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'catalogs',

  async getComponent(nextState, cb) {
    const catalogs = await import(/* webpackChunkName: 'catalogs' */ './modules/catalogs')
    const CatalogsContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogsContainer')

    injectReducer(store, {
      key: 'catalogs',
      reducer: catalogs.reducer
    })

    cb(null, CatalogsContainer.default)
  },

  async onEnter() {
    const catalogs = await import(/* webpackChunkName: 'catalogs' */ './modules/catalogs')

    store.dispatch(catalogs.actions.list())
  }
})
