export function isWebglSupported() {
  try {
    const canvas = document.createElement('canvas')

    return Boolean(
      window.WebGLRenderingContext && (
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
    )
  } catch (error) {
    return false
  }
}
