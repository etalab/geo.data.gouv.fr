const {Router} = require('express')

module.exports = app => {
  const router = new Router()

  router.get('/embed/datasets/:did/resources/:rtype::rid/:fid', (req, res) => {
    app.render(req, res, '/embed/preview', {
      ...req.query,
      did: req.params.did,
      rtype: req.params.rtype,
      rid: req.params.rid,
      fid: req.params.fid
    })
  })

  return router
}
