const express = require('express')
const path = require('path')
const next = require('next')
const i18n = require('i18next')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')

const createRoutes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
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
      'home',
      'catalogs',
      'search',
      'events',
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
      order: ['path', 'cookie', 'header']
    }
  }, () => {
    app.prepare()
      .then(() => {
        const server = express()

        server.use(i18nextMiddleware.handle(i18n))
        server.use('/locales', express.static(path.join(__dirname, '../locales')))

        if (dev) {
          server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))
        }

        const lngs = languages.join('|')
        server.use(`/:lng(${lngs})`, createRoutes(app))

        server.get('*', (req, res) => {
          if (!app.isInternalUrl(req)) {
            return res.redirect(`/${req.i18n.languages[0]}${req.url}`)
          }

          handle(req, res)
        })

        server.listen(port, (err) => {
          if (err) {
            throw err
          }

          // eslint-disable-next-line no-console
          console.log(`> Ready on http://localhost:${port}`)
        })
      })
  })
