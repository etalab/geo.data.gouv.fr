import FontFaceObserver from 'fontfaceobserver'

(async () => {
  if (sessionStorage.fontsLoaded) {
    document.documentElement.classList.add('font-loaded')
    return
  }

  const lato = new FontFaceObserver('Lato')
  const latoBold = new FontFaceObserver('Lato', {
    weight: 700
  })
  const latoItalic = new FontFaceObserver('Lato', {
    style: 'italic'
  })
  const latoBoldItalic = new FontFaceObserver('Lato', {
    weight: 700,
    style: 'italic'
  })

  await Promise.all([
    lato.load(),
    latoBold.load(),
    latoItalic.load(),
    latoBoldItalic.load()
  ])

  document.documentElement.classList.add('font-loaded')
  sessionStorage.fontLoaded = true
})()
