const internalPrefixes = [
  /^\/_next\//,
  /^\/static\//
]

function isInternalUrl(url) {
  for (const prefix of internalPrefixes) {
    if (prefix.test(url)) {
      return true
    }
  }

  return false
}

module.exports = {isInternalUrl}
