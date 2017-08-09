import asyncRoute from '../asyncRoute'

export default () => asyncRoute(async () => {
  return import(/* webpackChunkName: 'publication' */ './components/PublicationRouter')
})
