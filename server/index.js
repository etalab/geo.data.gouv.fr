const path = require('path')
const express = require('express')
const next = require('next')
const {isInternalUrl} = require('next/dist/server/utils')
const i18n = require('i18next')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const compression = require('compression')

const createRoutes = require('./routes')
const createLocalizedRoutes = require('./routes/localized')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const languages = [
  'fr',
  'en'
]

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'fr',
    load: 'languageOnly',
    lowerCaseLng: true,

    ns: [
      'catalogs',
      'dataset',
      'events',
      'home',
      'search',
      'preview',
      'common'
    ],
    defaultNS: 'common',
    whitelist: [
      ...languages
    ],

    preload: [
      ...languages
    ],

    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json')
    },

    detection: {
      order: ['path', 'querystring', 'cookie', 'header'],
      lookupQuerystring: 'lang'
    }
  }, async () => {
    await app.prepare()

    const server = express()

    if (!dev) {
      server.use(compression())
    }

    server.get('/robots.txt', (req, res) => {
      res.sendFile(path.join(__dirname, '../robots.txt'))
    })

    server.use(i18nextMiddleware.handle(i18n))
    server.use('/locales', express.static(path.join(__dirname, '../locales')))

    if (dev) {
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))
    }

    server.use(createRoutes(app))

    const lngs = languages.join('|')
    server.use(`/:lng(${lngs})`, createLocalizedRoutes(app))

    server.use('/static', express.static(path.join(__dirname, '../static'), {
      maxAge: '15d'
    }))

    server.get('*', (req, res) => {
      if (!isInternalUrl(req)) {
        return res.redirect(`/${req.i18n.languages[0]}${req.url}`)
      }

      handle(req, res)
    })

    server.listen(port, err => {
      if (err) {
        throw err
      }

      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
