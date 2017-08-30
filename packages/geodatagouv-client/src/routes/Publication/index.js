import Loadable from 'react-loadable'

import Loader from 'common/components/Loader'

export default Loadable({
  loader: () => import(/* webpackChunkName: 'publication' */ './components/PublicationRouter'),
  loading: Loader
})
