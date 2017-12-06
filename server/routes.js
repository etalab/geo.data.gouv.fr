const { Router } = require('express')

module.exports = app => {
  const router = new Router()

  router.get('/catalogs/:cid/harvest/:hid', (req, res) => {
    app.render(req, res, '/harvest', {
      ...req.query,
      cid: req.params.cid,
      hid: req.params.hid
    })
  })

  router.get('/catalogs/:cid', (req, res) => {
    app.render(req, res, '/catalog', {
      ...req.query,
      cid: req.params.cid
    })
  })

  router.get('/datasets/:did', (req, res) => {
    app.render(req, res, '/dataset', {
      ...req.query,
      did: req.params.did
    })
  })

  router.get('/publication', (req, res) => {
    app.render(req, res, '/publication', {
      ...req.query
    })
  })

  router.get('/publication/:oid/datasets', (req, res) => {
    app.render(req, res, '/publication/datasets', {
      ...req.query,
      oid: req.params.oid
    })
  })

  router.get('/publication/:oid/producers', (req, res) => {
    app.render(req, res, '/publication/producers', {
      ...req.query,
      oid: req.params.oid
    })
  })

  router.get('/publication/:oid', (req, res) => {
    app.render(req, res, '/publication/organization', {
      ...req.query,
      oid: req.params.oid
    })
  })

  router.get('*', (req, res) => {
    app.render(req, res, req.params[0], req.query)
  })

  return router
}
