const { Router } = require('express')

module.exports = app => {
  const router = new Router()

  router.get('/catalogs/:id', (req, res) => {
    app.render(req, res, '/catalog', {
      ...req.query,
      id: req.params.id
    })
  })

  router.get('/datasets/:id', (req, res) => {
    app.render(req, res, '/dataset', {
      ...req.query,
      id: req.params.id
    })
  })

  router.get('*', (req, res) => {
    app.render(req, res, req.params[0], req.query)
  })

  return router
}
