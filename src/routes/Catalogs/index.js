import asyncRoute from '../asyncRoute'

export default (store, i18n) => asyncRoute(async () => {
  const CatalogsRouter = await import(/* webpackChunkName: 'catalogs' */ './components/CatalogsRouter')

  return CatalogsRouter.default(store, i18n)
})
