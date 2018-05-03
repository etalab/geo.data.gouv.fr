const {Router} = require('express')

module.exports = app => {
  const router = new Router()

  router.get('/embed/datasets/:did/resources/:rid(*)', (req, res) => {
    app.render(req, res, '/embed/preview', {
      ...req.query,
      did: req.params.did,
      rid: req.params.rid
    })
  })

  return router
}
