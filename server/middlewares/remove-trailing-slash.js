const { parse, format } = require('url')

const removeTrailingSlash = app => (req, res, next) => {
  if (app.isInternalUrl(req.url)) {
    return next()
  }

  const parsed = parse(req.url)
  if (parsed.pathname === '/' || parsed.pathname[parsed.pathname.length - 1] !== '/') {
    return next()
  }

  parsed.pathname = parsed.pathname.slice(0, -1)

  res.redirect(301, format(parsed))
}

module.exports = removeTrailingSlash
